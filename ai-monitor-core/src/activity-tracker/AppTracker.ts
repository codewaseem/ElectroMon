import activeWin from "active-win";
// @ts-ignore
import ioHookManager from "./IoHookManager";
import IdleTimeTracker from "./IdleTimeTracker";
import { UserProfileObject } from "../api";
import { diffArrayObject } from "../utils";
type Milliseconds = number;

export interface AppsUsageLogs {
    [key: string]: {
        [key: string]: {
            timeSpent: Milliseconds,
            idleTime: Milliseconds,
            keystrokes: number,
            mouseclicks: number,
            sessions: Array<{
                startTime: number,
                endTime: number
            }>
        }
    }
}

export interface AppsUsageLogger {
    saveAppUsageLogs(data: AppsUsageLogs): Promise<AppsUsageLogs>;
    getAppUsageLogs(): Promise<AppsUsageLogs>;
}

export interface UsageHistory {
    appName: string,
    windowTitle: string,
    timeSpent: Milliseconds,
    idleTime: Milliseconds,
    keystrokes: number,
    mouseclicks: number,
    userId?: string | number,
    sessions: Array<{
        startTime: number,
        endTime: number
    }>
}

const separator = '-*-';

export default class AppTracker {

    static TIMER_INTERVAL = 5000;

    private _timerId!: NodeJS.Timeout;
    private _isTracking: boolean = false;
    private _trackingData: AppsUsageLogs = {};
    private _logger: AppsUsageLogger;
    private _isInitialized: boolean = false;
    private _lastActiveWindow: string = '';
    private _idleTimeTracker: IdleTimeTracker = new IdleTimeTracker();
    private _userProfile: UserProfileObject | undefined;
    private _history: UsageHistory[] = [];

    constructor(logger: AppsUsageLogger, userProfile?: UserProfileObject) {
        this._logger = logger;
        this._userProfile = userProfile;
    }

    setUserProfile(profile: UserProfileObject) {
        this._userProfile = profile;
    }

    async init() {
        this._trackingData = await this._logger.getAppUsageLogs();
        this._isInitialized = true;
    }

    private set timerId(id: NodeJS.Timeout) {
        this._timerId = id;
    }

    private _startTracking() {
        this.timerId = setTimeout(async () => {
            this._startTracking();
            this.saveActiveWindowData();
        }, AppTracker.TIMER_INTERVAL);

    }

    private async saveActiveWindowData() {
        const data = await activeWin();
        if (data) {
            const appName = data.owner.name;
            const windowTitle = data.title;
            const activeWindowId = `${appName}${separator}${windowTitle}`;

            if (!this._trackingData[appName]) {
                this._trackingData[appName] = {};
            }

            if (!this._trackingData[appName][windowTitle]) {
                this._trackingData[appName][windowTitle] = {
                    timeSpent: 0,
                    idleTime: 0,
                    mouseclicks: 0,
                    keystrokes: 0,
                    sessions: [],
                }
            }

            const { mouseclicks, keystrokes } = ioHookManager.getData();

            if (this._lastActiveWindow != activeWindowId) {

                this.recordSessionTime(appName, windowTitle);

                this._idleTimeTracker = new IdleTimeTracker(this._trackingData[appName][windowTitle].idleTime);
                this._lastActiveWindow = activeWindowId;
            }

            this._trackingData[appName][windowTitle].timeSpent += AppTracker.TIMER_INTERVAL / 1000;
            this._trackingData[appName][windowTitle].idleTime = this._idleTimeTracker.getTotalIdleTime();

            if (!this._userProfile || this._userProfile.trackKeyStrokes) {
                this._trackingData[appName][windowTitle].mouseclicks += mouseclicks;
                this._trackingData[appName][windowTitle].keystrokes += keystrokes;
            }

            ioHookManager.resetData();
            this._logger.saveAppUsageLogs(this._trackingData);
        }
    }


    private recordSessionTime(appName: string, windowTitle: string) {
        const currentTime = Date.now();

        this._trackingData[appName][windowTitle].sessions.push({
            startTime: currentTime,
            endTime: -1
        });

        if (this._lastActiveWindow) {
            const [lastAppName, lastWindowTitle] = this._lastActiveWindow.split(separator);

            const lastAppSessionIndex = this._trackingData[lastAppName][lastWindowTitle].sessions.length
                ? this._trackingData[lastAppName][lastWindowTitle].sessions.length - 1 : 0;


            this._trackingData[lastAppName][lastWindowTitle].sessions[lastAppSessionIndex].endTime = currentTime;
        }

    }

    getAppsUsageLogs() {
        return this._logger.getAppUsageLogs();
    }

    getCurrentUsageData() {
        return this._trackingData;
    }

    async start() {

        if (this._userProfile && !this._userProfile.trackApps) {
            console.log('tracking disabled for this user');
            return;
        }

        if (this._isTracking) return;

        if (this._isInitialized) {
            this._isTracking = true;
            this._startTracking();
            ioHookManager.start();
        } else {
            throw new Error('You need to first call init() and await for it to complete');
        }
    }

    stop() {
        if (!this._isTracking) return;
        this._isTracking = false;
        if (this._lastActiveWindow) {
            const [lastAppName, lastWindowTitle] = this._lastActiveWindow.split(separator);

            const lastAppSessionIndex = this._trackingData[lastAppName][lastWindowTitle].sessions.length
                ? this._trackingData[lastAppName][lastWindowTitle].sessions.length - 1 : 0;


            this._trackingData[lastAppName][lastWindowTitle].sessions[lastAppSessionIndex].endTime = Date.now();
        }

        clearTimeout(this._timerId);
        ioHookManager.stop();
    }

    getHistory() {
        const history: UsageHistory[] = [];
        Object.keys(this._trackingData).forEach(appName => {
            Object.keys(this._trackingData[appName]).forEach(windowTitle => {
                history.push({
                    appName,
                    windowTitle,
                    userId: this._userProfile?.userId,
                    ...this._trackingData[appName][windowTitle]
                });
            });
        });
        return history;
    }

    getChangedHistory(): UsageHistory[] {
        let oldHistory = this._history;
        let newHistory = this.getHistory();

        let changedHistory = diffArrayObject(oldHistory, newHistory);
        this._history = newHistory;

        return changedHistory;

    }

}