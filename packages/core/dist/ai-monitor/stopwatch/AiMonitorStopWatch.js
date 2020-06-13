"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerKeys = void 0;
const StopWatch_1 = __importDefault(require("./StopWatch"));
const common_1 = require("@ai-monitor/common");
exports.TimerKeys = {
  WORK_TIMER: "WORK",
  COFFEE_TIMER: "COFFEE",
  LUNCH_TIMER: "LUNCH",
};
class AiMonitorStopWatch {
  constructor(history, timersData) {
    this._timers = {
      [exports.TimerKeys.WORK_TIMER]: new StopWatch_1.default(),
      [exports.TimerKeys.COFFEE_TIMER]: new StopWatch_1.default(),
      [exports.TimerKeys.LUNCH_TIMER]: new StopWatch_1.default(),
    };
    this._durationByCount = 0;
    this._lastActiveTimer = "";
    this._currentActiveTimer = "";
    this._countTimerId = undefined;
    this._user = null;
    this._history = new common_1.HistoryTracker(history || []);
    this.setInitialState(timersData);
  }
  getFullHistory() {
    return this._history.getFullHistory();
  }
  deleteFullHistory() {
    this._history.deleteFullHistory();
  }
  getChangedHistory() {
    return this._history.getChangedHistory();
  }
  push(item) {
    this._history.push(item);
  }
  setInitialState(timersData) {
    if (timersData && Object.keys(timersData).length) {
      Object.keys(timersData).forEach((name) => {
        this._timers[name] = new StopWatch_1.default(timersData[name]);
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
  getUser() {
    throw new Error("Method not implemented.");
  }
  setUser(user) {
    this._user = user;
  }
  get currentActiveTimer() {
    return this._currentActiveTimer;
  }
  get lastActiveTimer() {
    return this._lastActiveTimer;
  }
  toJSON() {
    return this._timers;
  }
  toObject() {
    return this.toJSON();
  }
  toString() {
    return JSON.stringify(this._timers);
  }
  getWorkTotal() {
    return this._timers[exports.TimerKeys.WORK_TIMER].totalTime;
  }
  getLunchTotal() {
    return this._timers[exports.TimerKeys.LUNCH_TIMER].totalTime;
  }
  getCoffeeTotal() {
    return this._timers[exports.TimerKeys.COFFEE_TIMER].totalTime;
  }
  getTotal() {
    return this.getWorkTotal() + this.getCoffeeTotal() + this.getLunchTotal();
  }
  stopCurrentActiveTimer() {
    this._lastActiveTimer = this._currentActiveTimer;
    this._timers[this._currentActiveTimer].stop();
    this.stopManualCount();
  }
  startManualCount() {
    this._countTimerId = setTimeout(() => {
      this._durationByCount += 500;
      this.startManualCount();
    }, 500);
  }
  stopManualCount() {
    if (this._countTimerId) {
      clearTimeout(this._countTimerId);
      this._countTimerId = undefined;
    }
  }
  startWork() {
    this.start(exports.TimerKeys.WORK_TIMER);
  }
  startLunch() {
    this.start(exports.TimerKeys.LUNCH_TIMER);
  }
  startCoffee() {
    this.start(exports.TimerKeys.COFFEE_TIMER);
  }
  start(timerKey) {
    if (this._currentActiveTimer) this.stop();
    this._currentActiveTimer = timerKey;
    this._timers[timerKey].start();
    this._durationByCount = 0;
    this.startManualCount();
  }
  stop() {
    if (!this._currentActiveTimer) return;
    this.stopCurrentActiveTimer();
    const durationByCount = this._durationByCount;
    const lastTimer = this._timers[this._lastActiveTimer];
    const lastLap = lastTimer.laps.pop();
    if (lastLap) {
      const lap = {
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
exports.default = AiMonitorStopWatch;
//# sourceMappingURL=AiMonitorStopWatch.js.map
