"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const AppTracker_1 = __importDefault(require("./AppTracker"));
const AppDataStore_1 = __importDefault(require("./AppDataStore"));
const createAppUsageTracker = (dbPathName) => {
  return new AppTracker_1.default(new AppDataStore_1.default(dbPathName));
};
exports.default = createAppUsageTracker;
//# sourceMappingURL=index.js.map
