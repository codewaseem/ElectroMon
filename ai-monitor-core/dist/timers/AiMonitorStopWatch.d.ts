import StopWatch from "./StopWatch";
export declare const TimerKeys: {
    WORK_TIMER: string;
    COFFEE_TIMER: string;
    LUNCH_TIMER: string;
};
export interface LogHistory {
    logType: string;
    startTime: number;
    endTime: number;
    duration: number;
    durationByCount: number;
    userId?: string;
}
export default class AiMonitorStopWatch {
    private _timers;
    private _history;
    private _durationByCount;
    private _lastActiveTimer;
    private _currentActiveTimer;
    private _countTimerId;
    private _userId;
    constructor(history?: LogHistory[], timersData?: {
        [key: string]: StopWatch;
    });
    setUserId(id: string): void;
    get currentActiveTimer(): string;
    get lastActiveTimer(): string;
    toJSON(): {
        [x: string]: StopWatch;
    };
    toObject(): {
        [x: string]: StopWatch;
    };
    toString(): string;
    getWorkTotal(): number;
    getLunchTotal(): number;
    getCoffeeTotal(): number;
    getTotal(): number;
    private stopCurrentActiveTimer;
    private startManualCount;
    private stopManualCount;
    startWork(): void;
    startLunch(): void;
    startCoffee(): void;
    private start;
    stop(): void;
    getHistory(): LogHistory[];
    deleteHistory(): void;
}
//# sourceMappingURL=AiMonitorStopWatch.d.ts.map