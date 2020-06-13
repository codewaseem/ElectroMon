import activeWin from "active-win";
import ioHookManager from "./IoHookManager";
import IdleTimeTracker from "./IdleTimeTracker";
import { HistoryTracker } from "@ai-monitor/common";

const separator = "-*-";

export default class AppTracker implements IActivityTracker {
  static TIMER_INTERVAL = 5000;

  private _timerId!: NodeJS.Timeout;
  private _isTracking = false;
  private _trackingData: ActivityTrackerData = {};
  private _lastActiveWindow = "";
  private _idleTimeTracker: IdleTimeTracker = new IdleTimeTracker();
  private _history: HistoryTracker<UsageHistory>;
  private _user?: UserInfo;

  constructor(history?: UsageHistory[]) {
    this._history = new HistoryTracker<UsageHistory>(history || []);
  }

  async setInitialState(state: ActivityTrackerData): Promise<void> {
    this._trackingData = state;
  }

  getActivityTrackerData(): ActivityTrackerData {
    return this._trackingData;
  }

  deleteFullHistory(): void {
    this._history.deleteFullHistory();
  }

  push(item: UsageHistory): void {
    this._history.push(item);
  }

  setUser(user: UserInfo): void {
    this._user = user;
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
        };
      }

      const { mouseclicks, keystrokes } = ioHookManager.getData();

      if (this._lastActiveWindow != activeWindowId) {
        this.recordSessionTime(appName, windowTitle);

        this._idleTimeTracker = new IdleTimeTracker(
          this._trackingData[appName][windowTitle].idleTime
        );
        this._lastActiveWindow = activeWindowId;
      }

      this._trackingData[appName][windowTitle].timeSpent +=
        AppTracker.TIMER_INTERVAL / 1000;
      this._trackingData[appName][
        windowTitle
      ].idleTime = this._idleTimeTracker.getTotalIdleTime();

      this._trackingData[appName][windowTitle].mouseclicks += mouseclicks;
      this._trackingData[appName][windowTitle].keystrokes += keystrokes;

      ioHookManager.resetData();
    }
  }

  private recordSessionTime(appName: string, windowTitle: string) {
    const currentTime = Date.now();

    this._trackingData[appName][windowTitle].sessions.push({
      startTime: currentTime,
      endTime: -1,
    });

    if (this._lastActiveWindow) {
      const [lastAppName, lastWindowTitle] = this._lastActiveWindow.split(
        separator
      );

      const lastAppSessionIndex = this._trackingData[lastAppName][
        lastWindowTitle
      ].sessions.length
        ? this._trackingData[lastAppName][lastWindowTitle].sessions.length - 1
        : 0;

      this._trackingData[lastAppName][lastWindowTitle].sessions[
        lastAppSessionIndex
      ].endTime = currentTime;
    }
  }

  async startTracking(): Promise<void> {
    if (this._isTracking) return;

    this._isTracking = true;
    this._startTracking();
    ioHookManager.start();
  }

  async stopTracking(): Promise<void> {
    if (!this._isTracking) return;
    this._isTracking = false;
    if (this._lastActiveWindow) {
      const [lastAppName, lastWindowTitle] = this._lastActiveWindow.split(
        separator
      );

      const lastAppSessionIndex = this._trackingData[lastAppName][
        lastWindowTitle
      ].sessions.length
        ? this._trackingData[lastAppName][lastWindowTitle].sessions.length - 1
        : 0;

      this._trackingData[lastAppName][lastWindowTitle].sessions[
        lastAppSessionIndex
      ].endTime = Date.now();
    }

    this.setHistory();
    clearTimeout(this._timerId);
    ioHookManager.stop();
  }

  getFullHistory(): UsageHistory[] {
    return this._history.getFullHistory();
  }

  getChangedHistory(): UsageHistory[] {
    return this._history.getChangedHistory();
  }

  private setHistory() {
    const history: UsageHistory[] = [];
    Object.keys(this._trackingData).forEach((appName) => {
      Object.keys(this._trackingData[appName]).forEach((windowTitle) => {
        history.push({
          appName,
          windowTitle,
          userId: this._user ? this._user.id : "",
          ...this._trackingData[appName][windowTitle],
        });
      });
    });

    this._history = new HistoryTracker(history);
  }
}
