"use strict";
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
  };
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
  };
var _timeLogs, _usageLogs, _stopWatchState, _trackerState;
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryStorage {
  constructor() {
    _timeLogs.set(this, []);
    _usageLogs.set(this, []);
    _stopWatchState.set(this, void 0);
    _trackerState.set(this, void 0);
  }
  saveTimeLogs(timeLogs) {
    __classPrivateFieldGet(this, _timeLogs).push(...timeLogs);
    return Promise.resolve();
  }
  getTimeLogs() {
    return Promise.resolve(__classPrivateFieldGet(this, _timeLogs));
  }
  getUsageHistory() {
    return Promise.resolve(__classPrivateFieldGet(this, _usageLogs));
  }
  saveUsageHistory(history) {
    __classPrivateFieldGet(this, _usageLogs).push(...history);
    return Promise.resolve();
  }
  saveStopWatchState(state) {
    __classPrivateFieldSet(this, _stopWatchState, state);
    return Promise.resolve();
  }
  getStopWatchState() {
    if (
      __classPrivateFieldGet(this, _stopWatchState) &&
      Object.keys(__classPrivateFieldGet(this, _stopWatchState)).length >= 1
    )
      return Promise.resolve(__classPrivateFieldGet(this, _stopWatchState));
    else return Promise.resolve(undefined);
  }
  saveActivityTrackerState(state) {
    __classPrivateFieldSet(this, _trackerState, state);
    return Promise.resolve();
  }
  getActivityTrackerState() {
    if (
      __classPrivateFieldGet(this, _trackerState) &&
      Object.keys(__classPrivateFieldGet(this, _trackerState)).length >= 1
    )
      return Promise.resolve(__classPrivateFieldGet(this, _trackerState));
    else return Promise.resolve(undefined);
  }
}
exports.default = InMemoryStorage;
(_timeLogs = new WeakMap()),
  (_usageLogs = new WeakMap()),
  (_stopWatchState = new WeakMap()),
  (_trackerState = new WeakMap());
//# sourceMappingURL=InMemoryStorage.js.map
