import { UserProfileObject } from "../api";
declare type Milliseconds = number;
export interface AppsUsageLogs {
    [key: string]: {
        [key: string]: {
            timeSpent: Milliseconds;
            idleTime: Milliseconds;
            keystrokes: number;
            mouseclicks: number;
            sessions: Array<{
                startTime: number;
                endTime: number;
            }>;
        };
    };
}
export interface AppsUsageLogger {
    saveAppUsageLogs(data: AppsUsageLogs): Promise<AppsUsageLogs>;
    getAppUsageLogs(): Promise<AppsUsageLogs>;
}
export interface UsageHistory {
    appName: string;
    windowTitle: string;
    timeSpent: Milliseconds;
    idleTime: Milliseconds;
    keystrokes: number;
    mouseclicks: number;
    userId?: string | number;
    sessions: Array<{
        startTime: number;
        endTime: number;
    }>;
}
export default class AppTracker {
    static TIMER_INTERVAL: number;
    private _timerId;
    private _isTracking;
    private _trackingData;
    private _logger;
    private _isInitialized;
    private _lastActiveWindow;
    private _idleTimeTracker;
    private _userProfile;
    private _history;
    constructor(logger: AppsUsageLogger, userProfile?: UserProfileObject);
    setUserProfile(profile: UserProfileObject): void;
    init(): Promise<void>;
    private set timerId(value);
    private _startTracking;
    private saveActiveWindowData;
    private recordSessionTime;
    getAppsUsageLogs(): Promise<AppsUsageLogs>;
    getCurrentUsageData(): AppsUsageLogs;
    start(): Promise<void>;
    stop(): void;
    getHistory(): UsageHistory[];
    getChangedHistory(): UsageHistory[];
}
export {};
//# sourceMappingURL=AppTracker.d.ts.map