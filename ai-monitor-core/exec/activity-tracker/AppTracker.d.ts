declare type Milliseconds = number;
export interface AppsUsageLogs {
    [key: string]: {
        [key: string]: {
            timeSpent: Milliseconds;
            idleTime: Milliseconds;
            keystrokes: number;
            mouseclicks: number;
        };
    };
}
export interface AppsUsageLogger {
    saveAppUsageLogs(data: AppsUsageLogs): Promise<AppsUsageLogs>;
    getAppUsageLogs(): Promise<AppsUsageLogs>;
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
    constructor(logger: AppsUsageLogger);
    init(): Promise<void>;
    private set timerId(value);
    private _startTracking;
    private saveActiveWindowData;
    getAppsUsageLogs(): Promise<AppsUsageLogs>;
    getCurrentUsageData(): AppsUsageLogs;
    start(): Promise<void>;
    stop(): void;
}
export {};
//# sourceMappingURL=AppTracker.d.ts.map