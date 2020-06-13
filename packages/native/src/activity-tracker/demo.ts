#!/usr/bin/env ts-node-script

import AppTracker from "./ActivityTracker";

(async () => {
  const tracker = new AppTracker();
  tracker.startTracking();

  setInterval(async () => {
    const data = await tracker.getActivityTrackerData();

    console.log("Current Data");
    console.log(JSON.stringify(data, null, 2));
  }, AppTracker.TIMER_INTERVAL);
})();
