export declare const TimerKeys: {
  WORK_TIMER: string;
  COFFEE_TIMER: string;
  LUNCH_TIMER: string;
};
export default class AiMonitorStopWatch
  implements UserAssignable, HistoryTrackable<TimeLogHistory> {
  private _timers;
  private _history;
  private _durationByCount;
  private _lastActiveTimer;
  private _currentActiveTimer;
  private _countTimerId;
  private _user;
  constructor(history?: TimeLogHistory[], timersData?: NamedStopWatchesData);
  getFullHistory(): TimeLogHistory[];
  deleteFullHistory(): void;
  getChangedHistory(): TimeLogHistory[];
  push(item: TimeLogHistory): void;
  setInitialState(timersData?: NamedStopWatchesData): void;
  getUser(): UserInfo | null;
  setUser(user: UserInfo): void;
  get currentActiveTimer(): string;
  get lastActiveTimer(): string;
  toJSON(): NamedStopWatchesData;
  toObject(): NamedStopWatchesData;
  toString(): string;
  getWorkTotal(): Milliseconds;
  getLunchTotal(): Milliseconds;
  getCoffeeTotal(): Milliseconds;
  getTotal(): Milliseconds;
  private stopCurrentActiveTimer;
  private startManualCount;
  private stopManualCount;
  startWork(): void;
  startLunch(): void;
  startCoffee(): void;
  private start;
  stop(): void;
}
//# sourceMappingURL=AiMonitorStopWatch.d.ts.map
