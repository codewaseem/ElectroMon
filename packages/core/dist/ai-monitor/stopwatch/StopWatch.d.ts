export default class StopWatch {
  private _isRunning;
  private _milliseconds;
  private _timerId;
  private _startTime;
  private _laps;
  constructor(initialState?: StopWatchData);
  setInitialState(initialState?: StopWatchData): void;
  get laps(): TimeLap[];
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
    laps: TimeLap[];
    isRunning: boolean;
  };
  toObject(): {
    milliseconds: number;
    laps: TimeLap[];
    isRunning: boolean;
  };
}
//# sourceMappingURL=StopWatch.d.ts.map
