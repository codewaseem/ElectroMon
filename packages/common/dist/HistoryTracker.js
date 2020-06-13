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
var _history, _accessedHistory;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class HistoryTracker {
  constructor(initialHistory) {
    _history.set(this, []);
    _accessedHistory.set(this, []);
    __classPrivateFieldSet(this, _history, initialHistory);
  }
  push(item) {
    __classPrivateFieldGet(this, _history).push(item);
  }
  getFullHistory() {
    return __classPrivateFieldGet(this, _history).slice();
  }
  getChangedHistory() {
    const newHistory = utils_1.diffArrayObject(
      __classPrivateFieldGet(this, _accessedHistory),
      __classPrivateFieldGet(this, _history)
    );
    __classPrivateFieldSet(this, _accessedHistory, newHistory);
    return newHistory;
  }
  deleteFullHistory() {
    __classPrivateFieldSet(this, _history, []);
  }
}
exports.default = HistoryTracker;
(_history = new WeakMap()), (_accessedHistory = new WeakMap());
//# sourceMappingURL=HistoryTracker.js.map
