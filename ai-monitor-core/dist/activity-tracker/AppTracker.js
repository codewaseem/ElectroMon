"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const active_win_1 = __importDefault(require("active-win"));
// @ts-ignore
const IoHookManager_1 = __importDefault(require("./IoHookManager"));
const IdleTimeTracker_1 = __importDefault(require("./IdleTimeTracker"));
const utils_1 = require("../utils");
const separator = "-*-";
class AppTracker {
  constructor(logger, userProfile) {
    this._isTracking = false;
    this._trackingData = {};
    this._isInitialized = false;
    this._lastActiveWindow = "";
    this._idleTimeTracker = new IdleTimeTracker_1.default();
    this._history = [];
    this._logger = logger;
    this._userProfile = userProfile;
  }
  setUserProfile(profile) {
    this._userProfile = profile;
  }
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      this._trackingData = yield this._logger.getAppUsageLogs();
      this._isInitialized = true;
    });
  }
  set timerId(id) {
    this._timerId = id;
  }
  _startTracking() {
    this.timerId = setTimeout(
      () =>
        __awaiter(this, void 0, void 0, function* () {
          this._startTracking();
          this.saveActiveWindowData();
        }),
      AppTracker.TIMER_INTERVAL
    );
  }
  saveActiveWindowData() {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield active_win_1.default();
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
        if (!this._userProfile || this._userProfile.trackKeyStrokes) {
          this._trackingData[appName][windowTitle].mouseclicks += mouseclicks;
          this._trackingData[appName][windowTitle].keystrokes += keystrokes;
        }
        IoHookManager_1.default.resetData();
        this._logger.saveAppUsageLogs(this._trackingData);
      }
    });
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
  getAppsUsageLogs() {
    return this._logger.getAppUsageLogs();
  }
  getCurrentUsageData() {
    return this._trackingData;
  }
  start() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._userProfile && !this._userProfile.trackApps) {
        console.log("tracking disabled for this user");
        return;
      }
      if (this._isTracking) return;
      if (this._isInitialized) {
        this._isTracking = true;
        this._startTracking();
        IoHookManager_1.default.start();
      } else {
        throw new Error(
          "You need to first call init() and await for it to complete"
        );
      }
    });
  }
  stop() {
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
    clearTimeout(this._timerId);
    IoHookManager_1.default.stop();
  }
  getHistory() {
    const history = [];
    Object.keys(this._trackingData).forEach((appName) => {
      Object.keys(this._trackingData[appName]).forEach((windowTitle) => {
        var _a;
        history.push(
          Object.assign(
            {
              appName,
              windowTitle,
              userId:
                (_a = this._userProfile) === null || _a === void 0
                  ? void 0
                  : _a.userId,
            },
            this._trackingData[appName][windowTitle]
          )
        );
      });
    });
    return history;
  }
  getChangedHistory() {
    let oldHistory = this._history;
    let newHistory = this.getHistory();
    let changedHistory = utils_1.diffArrayObject(oldHistory, newHistory);
    this._history = newHistory;
    return changedHistory;
  }
}
exports.default = AppTracker;
AppTracker.TIMER_INTERVAL = 5000;
//# sourceMappingURL=AppTracker.js.map
