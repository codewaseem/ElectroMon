"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const desktop_idle_1 = __importDefault(require("desktop-idle"));
class IdleTimeTracker {
  constructor(prevIdleTime) {
    this._prevIdleTime = desktop_idle_1.default.getIdleTime();
    this._currentIdleTime = this._prevIdleTime;
    this._newTotalIdleTime = 0;
    this._totalIdleTime = 0;
    if (prevIdleTime) {
      this._prevIdleTime = prevIdleTime;
    }
  }
  getTotalIdleTime() {
    this._currentIdleTime = desktop_idle_1.default.getIdleTime();
    this._totalIdleTime = this._newTotalIdleTime + this._prevIdleTime;
    if (this._isNewIdleState()) {
      this._newTotalIdleTime += this._prevIdleTime;
      this._prevIdleTime = 0;
    } else {
      this._prevIdleTime = this._currentIdleTime;
    }
    return this._totalIdleTime;
  }
  _isNewIdleState() {
    return this._prevIdleTime > this._currentIdleTime;
  }
}
exports.default = IdleTimeTracker;
//# sourceMappingURL=IdleTimeTracker.js.map
