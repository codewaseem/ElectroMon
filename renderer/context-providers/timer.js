import moment from "moment";
import { TIME_DIFFERENCE_DETECTED } from "../../constants";

export const zeroPad = (number) => (number <= 9 ? `0${number}` : number);

class Timer {
  _isRunning = false;
  laps = [];
  milliseconds = 0;
  startTime = null;

  clearTimerId;

  constructor(initialData) {
    if (initialData) {
      this.laps = initialData.laps;
      this.milliseconds = initialData.milliseconds;
      this._isRunning = initialData.isRunning;
      this.startTime =
        initialData.startTimeISO && moment(initialData.startTimeISO);
    }
  }

  measure = () => {
    if (!this._isRunning) return;

    this.milliseconds = moment().diff(this.startTime);

    this.clearTimerId = setTimeout(() => this.measure(), 10);
  };

  calculateTotalRunningTime(laps) {
    let duration = 0;
    laps?.forEach((lap) => (duration += lap.duration));
    return this.toTimeObject(duration + this.currentTime);
  }

  getLaps = () => {
    return this.laps;
  };

  get isRunning() {
    return this._isRunning;
  }

  start() {
    if (this._isRunning) return;

    this._isRunning = true;
    this.startTime = moment();
    this.measure();
  }

  stop() {
    if (!this._isRunning) return;

    this._isRunning = false;
    clearTimeout(this.clearTimerId);

    // call measure manually to get accurate time duration.
    this.measure();
    this.laps.push({
      startTime: this.startTime.toISOString(),
      duration: this.milliseconds,
      endTime: moment(this.startTime).add(this.milliseconds).toISOString(), // should be always computed from startTime and duration
    });

    this.startTime = undefined;
    this.milliseconds = 0;
  }

  toTimeObject(milliseconds) {
    let ms = milliseconds || this.milliseconds;
    return millisecondsToTimeObject(ms);
  }

  // time of current running lap in ms
  get currentTime() {
    return this.milliseconds;
  }

  get latestLog() {
    return this.laps[this.laps.length - 1];
  }
  // time object of current running lap
  get currentTimeObject() {
    return this.toTimeObject();
  }

  // Total time is current running time + all time in laps
  get totalTime() {
    let duration = 0;
    this.laps.forEach((lap) => (duration += lap.duration));
    return duration + this.milliseconds;
  }

  get totalTimeObject() {
    return this.calculateTotalRunningTime(this.laps);
  }

  toJSON() {
    return {
      isRunning: this.isRunning,
      milliseconds: this.milliseconds,
      laps: this.laps,
      startTimeISO: this.startTime && this.startTime.toISOString(),
    };
  }

  toObject() {
    return this.toJSON();
  }

  toString() {
    return JSON.stringify(this.toObject());
  }
}

export class DatedTimer {
  logsByDate = {};

  getDateKey = () => moment().toISOString().split("T")[0];

  constructor(initialData) {
    // initialize timers by date with initial data
    if (initialData) {
      Object.keys(initialData).map((date) => {
        this.logsByDate[date] = new Timer(initialData[date]);
      });
    }
  }

  start() {
    this.getTimer().start();
  }

  stop() {
    this.getTimer().stop();
  }

  get totalTime() {
    return this.getTimer().totalTime;
  }

  get totalTimeObject() {
    return this.getTimer().totalTimeObject;
  }

  get isRunning() {
    return this.getTimer().isRunning;
  }

  get latestLog() {
    return this.getTimer().latestLog;
  }

  getTotalTimeOn(dateKey) {
    if (this.logsByDate[dateKey]) return this.logsByDate[dateKey].totalTime;
    return 0;
  }

  getTotalTimeObjectOn(dateKey) {
    if (this.logsByDate[dateKey])
      return this.logsByDate[dateKey].totalTimeObject;
  }

  getTimer(dateKey) {
    let key = dateKey || this.getDateKey();
    if (!this.logsByDate[key]) {
      // @ts-ignore
      this.logsByDate[key] = new Timer();
    }
    return this.logsByDate[key];
  }

  toJSON() {
    return this.logsByDate;
  }

  get currentRunningDuration() {
    return this.getTimer().currentTimeObject.seconds;
  }
}

export class TimersManager {
  timers = {};
  activeTimerKey = "";
  history = [];
  counterId = undefined;
  counterRunning = false;
  currentCount = 0;

  getActiveTimer() {
    return this.timers[this.activeTimerKey];
  }

  startCount() {
    this.counterRunning = true;
    this.counterId = setTimeout(() => {
      this.currentCount += 0.5;
      this.startCount();
    }, 500);
  }

  stopCount() {
    this.counterRunning = false;
    this.currentCount = 0;
    clearTimeout(this.counterId);
  }

  constructor(timersData, history) {
    if (history) {
      this.history = history;
    }

    if (timersData) {
      Object.keys(timersData).map((timerName) => {
        this.timers[timerName] = new DatedTimer(timersData[timerName]);
        if (this.timers[timerName].isRunning) {
          console.log("deactivate obsolete running timer");
          this.timers[timerName].stop();

          const lastLog = this.timers[timerName].latestLog;

          this.addRecentLogToHistory({
            logType: timerName,
            duration: lastLog.duration,
            durationByCount: lastLog.duration,
            endTime: lastLog.endTime,
            startTime: lastLog.startTime,
          });

          // now re-start the timer,
          this.startTimer(timerName);
        }
      });
    }
  }

  getHistory() {
    return this.history;
  }

  deleteHistory() {
    this.history = [];
  }

  getTotalTimeObject() {
    let total = 0;
    Object.keys(this.timers).map((timerName) => {
      total += this.timers[timerName].totalTime;
    });
    return millisecondsToTimeObject(total);
  }

  getTotalTimeFor(timerName) {
    return this.timers[timerName].totalTime;
  }

  getTotalTimeObjectFor(timerName) {
    return this.timers[timerName].totalTimeObject;
  }

  getTimersData() {
    return this.timers;
  }

  getActiveTimerKey() {
    return this.activeTimerKey;
  }

  startTimer(timerName) {
    let newTimer = this.timers[timerName];
    let activeTimer = this.getActiveTimer();
    if (activeTimer) this.stopTimer();

    if (!newTimer) return;
    if (this.counterId) clearTimeout(this.counterId);

    this.activeTimerKey = timerName;
    this.timers[timerName].start();

    this.startCount();
  }

  stopTimer() {
    let activeTimer = this.getActiveTimer();
    if (!activeTimer) return;
    activeTimer.stop();

    // capture state before resetting
    let currentCount = this.currentCount;

    // should stop the activeTimer before this line!
    let lastLog = activeTimer.latestLog;
    let logType = this.activeTimerKey;

    // reset state
    this.stopCount();
    this.activeTimerKey = "";

    this.addRecentLogToHistory({
      logType,
      duration: lastLog.duration,
      durationByCount: currentCount,
      endTime: lastLog.endTime,
      startTime: lastLog.startTime,
    });
  }

  checkTimeDifference() {
    let activeTimer = this.getActiveTimer();
    if (!activeTimer) return;

    let count = this.currentCount;
    let duration = +activeTimer.currentRunningDuration; // convert to number
    let diff = duration - count;
    if (Math.abs(diff) > 30) {
      throw new Error(TIME_DIFFERENCE_DETECTED);
    }
  }

  addRecentLogToHistory({
    logType,
    durationByCount,
    duration,
    startTime,
    endTime,
  }) {
    let log = {
      logType,
      durationByCount: Math.ceil(durationByCount),
      duration: moment(duration).seconds(),
      startTime,
      endTime,
    };
    this.history.push(log);
  }

  getTimerByName(timerName) {
    return this.timers[timerName];
  }

  addNewTimer(timerName) {
    if (this.timers[timerName]) return;

    // @ts-ignore
    this.timers[timerName] = new DatedTimer();
  }

  toJSON() {
    return this.timers;
  }
}

function millisecondsToTimeObject(milliseconds) {
  let time = moment(milliseconds).utc();
  return {
    hours: zeroPad(time.hours()),
    minutes: zeroPad(time.minutes()),
    seconds: zeroPad(time.seconds()),
  };
}
