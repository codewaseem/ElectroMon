"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const active_win_1 = __importDefault(require("active-win"));
const IoHookManager_1 = __importDefault(require("./IoHookManager"));
const IdleTimeTracker_1 = __importDefault(require("./IdleTimeTracker"));
const common_1 = require("@ai-monitor/common");
const separator = "-*-";
class AppTracker {
  constructor(history) {
    this._isTracking = false;
    this._trackingData = {};
    this._lastActiveWindow = "";
    this._idleTimeTracker = new IdleTimeTracker_1.default();
    this._history = new common_1.HistoryTracker(history || []);
  }
  async setInitialState(state) {
    this._trackingData = state;
  }
  getActivityTrackerData() {
    return this._trackingData;
  }
  deleteFullHistory() {
    this._history.deleteFullHistory();
  }
  push(item) {
    this._history.push(item);
  }
  setUser(user) {
    this._user = user;
  }
  set timerId(id) {
    this._timerId = id;
  }
  _startTracking() {
    this.timerId = setTimeout(async () => {
      this._startTracking();
      this.saveActiveWindowData();
    }, AppTracker.TIMER_INTERVAL);
  }
  async saveActiveWindowData() {
    const data = await active_win_1.default();
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
      const { mouseclicks, keystrokes } = IoHookManager_1.default.getData();
      if (this._lastActiveWindow != activeWindowId) {
        this.recordSessionTime(appName, windowTitle);
        this._idleTimeTracker = new IdleTimeTracker_1.default(
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
      IoHookManager_1.default.resetData();
    }
  }
  recordSessionTime(appName, windowTitle) {
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
  async startTracking() {
    if (this._isTracking) return;
    this._isTracking = true;
    this._startTracking();
    IoHookManager_1.default.start();
  }
  async stopTracking() {
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
    IoHookManager_1.default.stop();
  }
  getFullHistory() {
    return this._history.getFullHistory();
  }
  getChangedHistory() {
    return this._history.getChangedHistory();
  }
  setHistory() {
    const history = [];
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
    this._history = new common_1.HistoryTracker(history);
  }
}
exports.default = AppTracker;
AppTracker.TIMER_INTERVAL = 5000;
//# sourceMappingURL=ActivityTracker.js.map
