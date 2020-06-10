import { sayHello } from "@ai-monitor/core";
import type { AiMonitor } from "@ai-monitor/core";

class AiMon implements AiMonitor {
  startWork() {
    console.log("Starting work");
  }
}

const aiMon = new AiMon();

sayHello();

aiMon.startWork();
