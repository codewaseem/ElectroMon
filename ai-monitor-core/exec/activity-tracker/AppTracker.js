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
let AppTracker = /** @class */ (() => {
  class AppTracker {
    constructor(logger) {
      this._isTracking = false;
      this._trackingData = {};
      this._isInitialized = false;
      this._lastActiveWindow = "";
      this._idleTimeTracker = new IdleTimeTracker_1.default();
      this._logger = logger;
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
          const activeWindowId = `${appName}-${windowTitle}`;
          if (this._lastActiveWindow != activeWindowId) {
            this._lastActiveWindow = activeWindowId;
            this._idleTimeTracker = new IdleTimeTracker_1.default();
          }
          if (!this._trackingData[appName]) {
            this._trackingData[appName] = {};
          }
          if (!this._trackingData[appName][windowTitle]) {
            this._trackingData[appName][windowTitle] = {
              timeSpent: 0,
              idleTime: 0,
              mouseclicks: 0,
              keystrokes: 0,
            };
          }
          const {
            mouseclicks,
            keystrokes,
          } = IoHookManager_1.default.getData();
          this._trackingData[appName][windowTitle].timeSpent +=
            AppTracker.TIMER_INTERVAL / 1000;
          this._trackingData[appName][
            windowTitle
          ].idleTime = this._idleTimeTracker.getTotalIdleTime();
          this._trackingData[appName][windowTitle].mouseclicks += mouseclicks;
          this._trackingData[appName][windowTitle].keystrokes += keystrokes;
          IoHookManager_1.default.resetData();
          this._logger.saveAppUsageLogs(this._trackingData);
        }
      });
    }
    getAppsUsageLogs() {
      return this._logger.getAppUsageLogs();
    }
    getCurrentUsageData() {
      return this._trackingData;
    }
    start() {
      return __awaiter(this, void 0, void 0, function* () {
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
      clearTimeout(this._timerId);
      IoHookManager_1.default.stop();
    }
  }
  AppTracker.TIMER_INTERVAL = 5000;
  return AppTracker;
})();
exports.default = AppTracker;
//# sourceMappingURL=AppTracker.js.map
