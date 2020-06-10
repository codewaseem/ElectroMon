"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ai-monitor/core");
class AiMon {
  startWork() {
    console.log("Starting work");
  }
}
const aiMon = new AiMon();
core_1.sayHello();
aiMon.startWork();
//# sourceMappingURL=index.js.map
