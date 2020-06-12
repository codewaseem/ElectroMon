"use strict";
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
  };
var _aiMonitorApi, _stopwatch, _activityTracker, _storageGateway, _user;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
exports.ErrorMessages = {
  notLoggedIn: "Not Logged In: Please Login first.",
};
class AiMonitor {
  constructor({ aiMonitorApi, stopwatch, activityTracker, storageGateway }) {
    _aiMonitorApi.set(this, void 0);
    _stopwatch.set(this, void 0);
    _activityTracker.set(this, void 0);
    _storageGateway.set(this, void 0);
    _user.set(this, void 0);
    __classPrivateFieldSet(this, _aiMonitorApi, aiMonitorApi);
    __classPrivateFieldSet(this, _activityTracker, activityTracker);
    __classPrivateFieldSet(this, _stopwatch, stopwatch);
    __classPrivateFieldSet(this, _storageGateway, storageGateway);
  }
  async startWork() {
    this.throwIfUserNotSet();
    __classPrivateFieldGet(this, _stopwatch).startWork();
    __classPrivateFieldGet(this, _activityTracker).startTracking();
  }
  async startCoffeeBreak() {
    this.throwIfUserNotSet();
    await this.stop();
    __classPrivateFieldGet(this, _stopwatch).startCoffee();
  }
  async startLunchBreak() {
    this.throwIfUserNotSet();
    await this.stop();
    __classPrivateFieldGet(this, _stopwatch).startLunch();
  }
  async stop() {
    __classPrivateFieldGet(this, _stopwatch).stop();
    __classPrivateFieldGet(this, _activityTracker).stopTracking();
    await this.syncData();
  }
  addManualTime() {
    throw new Error("Method not implemented.");
  }
  applyForLeave() {
    throw new Error("Method not implemented.");
  }
  async logout() {
    if (!__classPrivateFieldGet(this, _user)) return;
    await this.stop();
    await __classPrivateFieldGet(this, _aiMonitorApi).logout();
    __classPrivateFieldSet(this, _user, undefined);
  }
  async login(email, password) {
    const user = await __classPrivateFieldGet(this, _aiMonitorApi).login(
      email,
      password
    );
    __classPrivateFieldGet(this, _stopwatch).setUser(user);
    const state = await __classPrivateFieldGet(
      this,
      _storageGateway
    ).getSavedStopWatchState();
    __classPrivateFieldGet(this, _stopwatch).setInitialState(state);
    await __classPrivateFieldGet(this, _activityTracker).init(user);
    __classPrivateFieldSet(this, _user, user);
  }
  async syncData() {
    const timeLogs = __classPrivateFieldGet(
      this,
      _stopwatch
    ).getLastSessionHistory();
    const usageLogs = __classPrivateFieldGet(
      this,
      _activityTracker
    ).getLastSessionHistory();
    await Promise.all([
      __classPrivateFieldGet(this, _aiMonitorApi).addTimeLogs(timeLogs),
      __classPrivateFieldGet(this, _aiMonitorApi).addUsageLogs(usageLogs),
      __classPrivateFieldGet(this, _storageGateway).saveTimeLogs(timeLogs),
      __classPrivateFieldGet(this, _storageGateway).saveUsageHistory(
        usageLogs
      ),
      __classPrivateFieldGet(this, _storageGateway).saveStopWatchState(
        __classPrivateFieldGet(this, _stopwatch).toJSON()
      ),
    ]);
  }
  throwIfUserNotSet() {
    if (
      !__classPrivateFieldGet(this, _user) ||
      !__classPrivateFieldGet(this, _user).id
    ) {
      throw exports.ErrorMessages.notLoggedIn;
    }
  }
}
exports.default = AiMonitor;
(_aiMonitorApi = new WeakMap()),
  (_stopwatch = new WeakMap()),
  (_activityTracker = new WeakMap()),
  (_storageGateway = new WeakMap()),
  (_user = new WeakMap());
//# sourceMappingURL=index.js.map
