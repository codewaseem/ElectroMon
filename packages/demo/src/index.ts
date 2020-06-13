import AiMonitor from "@ai-monitor/core";
import ActivityTracker from "@ai-monitor/native";
import { delay } from "@ai-monitor/common";

import { InMemoryStorage } from "@ai-monitor/storage";

const aiMonitorApi: IAiMonitorApi = {
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

const activityTracker = new ActivityTracker();
const storageGateway = new InMemoryStorage();

const aiMonitor = new AiMonitor({
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

  await delay(1000 * 60);

  aiMonitor.stop();

  console.log("\n\n\nSTORAGE- DATA");

  console.log(await storageGateway.getUsageHistory());
  console.log(await storageGateway.getTimeLogs());
  process.exit(0);
})();
