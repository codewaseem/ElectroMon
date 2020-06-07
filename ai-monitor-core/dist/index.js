"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiMonitorStopWatch = void 0;
const AiMonitorStopWatch_1 = __importDefault(
  require("./timers/AiMonitorStopWatch")
);
var api_1 = require("./api");
Object.defineProperty(exports, "aiMonitorApi", {
  enumerable: true,
  get: function () {
    return api_1.default;
  },
});
exports.aiMonitorStopWatch = new AiMonitorStopWatch_1.default();
//# sourceMappingURL=index.js.map
