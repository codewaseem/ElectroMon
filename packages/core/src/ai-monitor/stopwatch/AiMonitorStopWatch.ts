import StopWatch from "./StopWatch";
import HistoryTracker from "../HistoryTracker";

export const TimerKeys = {
  WORK_TIMER: "WORK",
  COFFEE_TIMER: "COFFEE",
  LUNCH_TIMER: "LUNCH",
};

export default class AiMonitorStopWatch
  implements UserAssignable, HistoryTrackable<TimeLogHistory> {
  private _timers = {
    [TimerKeys.WORK_TIMER]: new StopWatch(),
    [TimerKeys.COFFEE_TIMER]: new StopWatch(),
    [TimerKeys.LUNCH_TIMER]: new StopWatch(),
  };
  private _history: HistoryTracker<TimeLogHistory>;
  private _durationByCount = 0;
  private _lastActiveTimer = "";
  private _currentActiveTimer = "";
  private _countTimerId: NodeJS.Timeout | undefined = undefined;
  private _user: UserInfo | null = null;

  constructor(history?: TimeLogHistory[], timersData?: NamedStopWatchesData) {
    this._history = new HistoryTracker<TimeLogHistory>(history || []);

    this.setInitialState(timersData);
  }

  getFullHistory(): TimeLogHistory[] {
    return this._history.getFullHistory();
  }
  deleteFullHistory(): void {
    this._history.deleteFullHistory();
  }
  getChangedHistory(): TimeLogHistory[] {
    return this._history.getChangedHistory();
  }
  push(item: TimeLogHistory): void {
    this._history.push(item);
  }

  setInitialState(timersData?: NamedStopWatchesData): void {
    if (timersData && Object.keys(timersData).length) {
      Object.keys(timersData).forEach((name) => {
        this._timers[name] = new StopWatch(timersData[name]);

        if (this._timers[name].isRunning) {
          const lap = this._timers[name].laps.pop();
          if (lap) {
            this._history.push({
              logType: name,
              ...lap,
              durationByCount: -1,
            });
          }
          this._currentActiveTimer = name;
          this.stop();
          this.start(name);
        }
      });
    }
  }

  getUser(): UserInfo | null {
    throw new Error("Method not implemented.");
  }

  setUser(user: UserInfo): void {
    this._user = user;
  }

  get currentActiveTimer(): string {
    return this._currentActiveTimer;
  }

  get lastActiveTimer(): string {
    return this._lastActiveTimer;
  }

  toJSON(): NamedStopWatchesData {
    return this._timers;
  }

  toObject(): NamedStopWatchesData {
    return this.toJSON();
  }

  toString(): string {
    return JSON.stringify(this._timers);
  }

  getWorkTotal(): Milliseconds {
    return this._timers[TimerKeys.WORK_TIMER].totalTime;
  }

  getLunchTotal(): Milliseconds {
    return this._timers[TimerKeys.LUNCH_TIMER].totalTime;
  }

  getCoffeeTotal(): Milliseconds {
    return this._timers[TimerKeys.COFFEE_TIMER].totalTime;
  }

  getTotal(): Milliseconds {
    return this.getWorkTotal() + this.getCoffeeTotal() + this.getLunchTotal();
  }

  private stopCurrentActiveTimer() {
    this._lastActiveTimer = this._currentActiveTimer;
    this._timers[this._currentActiveTimer].stop();
    this.stopManualCount();
  }

  private startManualCount() {
    this._countTimerId = setTimeout(() => {
      this._durationByCount += 500;
      this.startManualCount();
    }, 500);
  }

  private stopManualCount() {
    if (this._countTimerId) {
      clearTimeout(this._countTimerId);
      this._countTimerId = undefined;
    }
  }

  startWork(): void {
    this.start(TimerKeys.WORK_TIMER);
  }

  startLunch(): void {
    this.start(TimerKeys.LUNCH_TIMER);
  }

  startCoffee(): void {
    this.start(TimerKeys.COFFEE_TIMER);
  }

  private start(timerKey: string) {
    if (this._currentActiveTimer) this.stop();

    this._currentActiveTimer = timerKey;
    this._timers[timerKey].start();
    this._durationByCount = 0;
    this.startManualCount();
  }

  stop(): void {
    if (!this._currentActiveTimer) return;

    this.stopCurrentActiveTimer();

    const durationByCount = this._durationByCount;
    const lastTimer = this._timers[this._lastActiveTimer];
    const lastLap = lastTimer.laps.pop();

    if (lastLap) {
      const lap: TimeLogHistory = {
        logType: this._lastActiveTimer,
        ...lastLap,
        durationByCount,
      };
      if (this._user) lap.userId = this._user.id;
      this._history.push(lap);
    }

    this._currentActiveTimer = "";
  }
}
