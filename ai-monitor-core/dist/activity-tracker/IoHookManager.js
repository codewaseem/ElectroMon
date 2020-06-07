"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const iohook_1 = __importDefault(require("iohook"));
class IoHookManager {
  constructor() {
    this._mouseclicks = 0;
    this._keystrokes = 0;
    this.subscribers = [];
    this._incrementMouseClicks = () => {
      this._mouseclicks++;
      this._onChange();
    };
    this._incrementKeystrokes = () => {
      this._keystrokes++;
      this._onChange();
    };
  }
  start() {
    iohook_1.default.start();
    iohook_1.default.on("keyup", this._incrementKeystrokes);
    iohook_1.default.on("mouseup", this._incrementMouseClicks);
    iohook_1.default.on("mousewheel", this._incrementMouseClicks);
  }
  resetData() {
    this._mouseclicks = 0;
    this._keystrokes = 0;
  }
  stop() {
    iohook_1.default.off("keyup", this._incrementKeystrokes);
    iohook_1.default.off("mouseup", this._incrementMouseClicks);
    iohook_1.default.off("mousewheel", this._incrementMouseClicks);
    iohook_1.default.stop();
  }
  getData() {
    return {
      mouseclicks: this._mouseclicks,
      keystrokes: this._keystrokes,
    };
  }
  subscribe(fn) {
    this.subscribers.push(fn);
  }
  _onChange() {
    this.subscribers.forEach((fn) => fn(this.getData()));
  }
}
const ioHookManager = new IoHookManager();
exports.default = ioHookManager;
//# sourceMappingURL=IoHookManager.js.map
