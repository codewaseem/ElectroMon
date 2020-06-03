"use strict";
// @ts-ignore
// import desktopIdle from "desktop-idle";
Object.defineProperty(exports, "__esModule", { value: true });
const desktopIdle = {
  getIdleTime() {
    return 0;
  },
};
class IdleTimeTracker {
  constructor() {
    this._prevIdleTime = desktopIdle.getIdleTime();
    this._currentIdleTime = this._prevIdleTime;
    this._newTotalIdleTime = 0;
    this._totalIdleTime = 0;
  }
  getTotalIdleTime() {
    this._currentIdleTime = desktopIdle.getIdleTime();
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
