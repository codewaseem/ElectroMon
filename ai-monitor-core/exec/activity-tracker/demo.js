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
const AppTracker_1 = __importDefault(require("./AppTracker"));
const AppDataStore_1 = __importDefault(require("./AppDataStore"));
(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tracker = new AppTracker_1.default(new AppDataStore_1.default());
    yield tracker.init();
    tracker.start();
    setInterval(
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          let data = yield tracker.getAppsUsageLogs();
          console.log("Current Data");
          console.log(JSON.stringify(data, null, 2));
        }),
      AppTracker_1.default.TIMER_INTERVAL
    );
  }))();
//# sourceMappingURL=demo.js.map
