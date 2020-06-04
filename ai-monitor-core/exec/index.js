"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
Object.defineProperty(exports, "aiMonitorApi", {
  enumerable: true,
  get: function () {
    return api_1.default;
  },
});
var activity_tracker_1 = require("./activity-tracker");
Object.defineProperty(exports, "createAppUsageTracker", {
  enumerable: true,
  get: function () {
    return activity_tracker_1.default;
  },
});
//# sourceMappingURL=index.js.map
