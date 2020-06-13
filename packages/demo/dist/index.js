"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@ai-monitor/core"));
const native_1 = __importDefault(require("@ai-monitor/native"));
const common_1 = require("@ai-monitor/common");
const storage_1 = require("@ai-monitor/storage");
const aiMonitorApi = {
  login: () =>
    Promise.resolve({
      email: "test@email.com",
      id: "1",
    }),
  logout: () => Promise.resolve(),
  addTimeLogs: () => Promise.resolve(),
  addUsageLogs: () => Promise.resolve(),
  applyForLeave: () => Promise.resolve(),
};
const activityTracker = new native_1.default();
const storageGateway = new storage_1.InMemoryStorage();
const aiMonitor = new core_1.default({
  aiMonitorApi,
  activityTracker,
  storageGateway,
});
(async () => {
  await aiMonitor.login("test@email.com", "1");
  aiMonitor.startWork();
  setInterval(() => {
    console.log("\n\n\nTRACKER- DATA");
    console.log(activityTracker.getActivityTrackerData());
  }, 5000);
  await common_1.delay(1000 * 60);
  aiMonitor.stop();
  console.log("\n\n\nSTORAGE- DATA");
  console.log(await storageGateway.getUsageHistory());
  console.log(await storageGateway.getTimeLogs());
  process.exit(0);
})();
//# sourceMappingURL=index.js.map
