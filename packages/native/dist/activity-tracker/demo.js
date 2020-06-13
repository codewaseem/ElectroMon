#!/usr/bin/env ts-node-script
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityTracker_1 = __importDefault(require("./ActivityTracker"));
(async () => {
  const tracker = new ActivityTracker_1.default();
  tracker.startTracking();
  setInterval(async () => {
    const data = await tracker.getActivityTrackerData();
    console.log("Current Data");
    console.log(JSON.stringify(data, null, 2));
  }, ActivityTracker_1.default.TIMER_INTERVAL);
})();
//# sourceMappingURL=demo.js.map
