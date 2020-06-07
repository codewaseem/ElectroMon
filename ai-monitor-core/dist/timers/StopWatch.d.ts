interface Lap {
    duration: number;
    startTime: number;
    endTime: number;
}
export default class StopWatch {
    private _isRunning;
    private _milliseconds;
    private _timerId;
    private _startTime;
    private _laps;
    constructor(initialState?: {
        isRunning?: boolean;
        laps?: Lap[];
        milliseconds?: number;
    });
    get laps(): Lap[];
    get milliseconds(): number;
    get isRunning(): boolean;
    get totalLaps(): number;
    get lapsTotal(): number;
    get totalTime(): number;
    start(): void;
    stop(): void;
    reset(): void;
    private startTicking;
    toJSON(): {
        milliseconds: number;
        laps: Lap[];
        isRunning: boolean;
    };
    toObject(): {
        milliseconds: number;
        laps: Lap[];
        isRunning: boolean;
    };
}
export {};
//# sourceMappingURL=StopWatch.d.ts.map