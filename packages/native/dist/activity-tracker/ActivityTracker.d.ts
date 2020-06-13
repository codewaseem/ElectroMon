export default class ActivityTracker implements IActivityTracker {
  static TIMER_INTERVAL: number;
  private _timerId;
  private _isTracking;
  private _trackingData;
  private _lastActiveWindow;
  private _idleTimeTracker;
  private _history;
  private _user?;
  constructor(history?: UsageHistory[]);
  setInitialState(state: ActivityTrackerData | undefined): void;
  getActivityTrackerData(): ActivityTrackerData;
  deleteFullHistory(): void;
  push(item: UsageHistory): void;
  setUser(user: UserInfo): void;
  private set timerId(value);
  private _startTracking;
  private saveActiveWindowData;
  private recordSessionTime;
  startTracking(): Promise<void>;
  stopTracking(): Promise<void>;
  getFullHistory(): UsageHistory[];
  getChangedHistory(): UsageHistory[];
  private setHistory;
}
//# sourceMappingURL=ActivityTracker.d.ts.map
