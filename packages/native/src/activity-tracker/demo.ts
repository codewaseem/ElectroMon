#!/usr/bin/env ts-node-script

import ActivityTracker from "./ActivityTracker";

(async () => {
  const tracker = new ActivityTracker();
  tracker.startTracking();

  setInterval(async () => {
    const data = await tracker.getActivityTrackerData();

    console.log("Current Data");
    console.log(JSON.stringify(data, null, 2));
  }, ActivityTracker.TIMER_INTERVAL);
})();
