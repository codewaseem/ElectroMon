"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const level_1 = __importDefault(require("level"));
const APP_USAGE_DATA_KEY = "AppUsageLogs";
class AppDataStore {
  constructor(dbPathName = "__appdata__") {
    this.db = level_1.default(dbPathName);
  }
  saveAppUsageLogs(data) {
    return __awaiter(this, void 0, void 0, function* () {
      let logs = yield this.getAppUsageLogs();
      logs = Object.assign(Object.assign({}, logs), data);
      const dateKey = new Date().toLocaleDateString();
      yield this.db.put(
        APP_USAGE_DATA_KEY,
        JSON.stringify({
          [dateKey]: logs,
        })
      );
      return data;
    });
  }
  getAppUsageLogs() {
    return __awaiter(this, void 0, void 0, function* () {
      const dateKey = new Date().toLocaleDateString();
      let value = `{
            "${dateKey}": {}
        }`;
      try {
        value = yield this.db.get(APP_USAGE_DATA_KEY);
      } catch (e) {
        console.log("Key not found! Creating new one");
      }
      console.log(value);
      const data = JSON.parse(value)[dateKey];
      return data || {};
    });
  }
}
exports.default = AppDataStore;
//# sourceMappingURL=AppDataStore.js.map
