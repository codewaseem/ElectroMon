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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _timeLogs, _usageLogs, _db;
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const level_1 = __importDefault(require("level"));
const TIME_LOG = "TIME_LOG";
const USAGE_LOG = "USAGE_LOG";
const STOPWATCh_STATE = "STOPWATCH_STATE";
const TRACKER_STATE = "TRACKER_STATE";
const DB_NAME = "__appdata__";
class LevelDBStorage {
  constructor() {
    _timeLogs.set(this, []);
    _usageLogs.set(this, []);
    _db.set(this, void 0);
    __classPrivateFieldSet(this, _db, level_1.default(DB_NAME));
  }
  async saveTimeLogs(timeLogs) {
    __classPrivateFieldGet(this, _timeLogs).push(...timeLogs);
    await __classPrivateFieldGet(this, _db).put(
      TIME_LOG,
      JSON.stringify(__classPrivateFieldGet(this, _timeLogs))
    );
  }
  async getTimeLogs() {
    const data = await __classPrivateFieldGet(this, _db).get(TIME_LOG);
    return JSON.parse(data);
  }
  async getUsageHistory() {
    const data = await __classPrivateFieldGet(this, _db).get(USAGE_LOG);
    return JSON.parse(data);
  }
  async saveUsageHistory(history) {
    __classPrivateFieldGet(this, _usageLogs).push(...history);
    await __classPrivateFieldGet(this, _db).put(
      USAGE_LOG,
      JSON.stringify(__classPrivateFieldGet(this, _usageLogs))
    );
  }
  async saveStopWatchState(state) {
    await __classPrivateFieldGet(this, _db).put(
      STOPWATCh_STATE,
      JSON.stringify(state)
    );
  }
  async getStopWatchState() {
    const data = await __classPrivateFieldGet(this, _db).get(STOPWATCh_STATE);
    return data ? JSON.parse(data) : undefined;
  }
  async saveActivityTrackerState(state) {
    await __classPrivateFieldGet(this, _db).put(
      TRACKER_STATE,
      JSON.stringify(state)
    );
  }
  async getActivityTrackerState() {
    const data = await __classPrivateFieldGet(this, _db).get(TRACKER_STATE);
    return data ? JSON.parse(data) : undefined;
  }
}
exports.default = LevelDBStorage;
(_timeLogs = new WeakMap()),
  (_usageLogs = new WeakMap()),
  (_db = new WeakMap());
//# sourceMappingURL=LevelDBStorage.js.map
