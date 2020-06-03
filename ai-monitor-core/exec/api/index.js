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
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
  };
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _authInfo, _user, _getAuthHeaders, _isAuthInfoSet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_TIME_LOG = exports.ADD_LEAVE_URL = exports.MONITOR_API_URL = exports.LOGIN_URL = exports.PULSE_AUTH_URL = exports.BASE_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.BASE_URL = "https://api.dev.aptask.com";
exports.PULSE_AUTH_URL = "/api/v1/users/pulse-two/login";
exports.LOGIN_URL = exports.BASE_URL + exports.PULSE_AUTH_URL;
exports.MONITOR_API_URL = `${exports.BASE_URL}/api/v1/apps/ai-monitor`;
exports.ADD_LEAVE_URL = `${exports.MONITOR_API_URL}/leaves`;
exports.ADD_TIME_LOG = `${exports.MONITOR_API_URL}/logs`;
class AiMonitorApi {
  constructor() {
    _authInfo.set(this, void 0);
    _user.set(this, void 0);
    _getAuthHeaders.set(this, () => {
      return {
        Authorization: `Bearer ${
          __classPrivateFieldGet(this, _authInfo).token
        }`,
        Accept: `application/json, text/plain, */*`,
        "Content-Type": `application/json;charset=utf-8`,
      };
    });
    _isAuthInfoSet.set(this, () => {
      var _a;
      return (
        ((_a = __classPrivateFieldGet(this, _authInfo)) === null ||
        _a === void 0
          ? void 0
          : _a.userId) && __classPrivateFieldGet(this, _authInfo).token
      );
    });
  }
  setAuthInfo(info) {
    __classPrivateFieldSet(this, _authInfo, info);
  }
  setUser(userInfo) {
    __classPrivateFieldSet(this, _user, userInfo);
  }
  getUser() {
    return __classPrivateFieldGet(this, _user);
  }
  login(userName, password) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield axios_1
        .default({
          url: exports.LOGIN_URL,
          method: "POST",
          data: {
            userName,
            password,
          },
        })
        .then((r) => r.data);
      if (data.code == 500) {
        throw new Error(
          "Login Failed! Please check your Pulse email and/or password or send an email to support@aptask.com"
        );
      } else if (data.code == 200 && data.data && data.data.id) {
        const user = data.data;
        const pulseTwoContext =
          typeof user.pulseTwoContext == "string"
            ? JSON.parse(user.pulseTwoContext)
            : user.pulseTwoContext;
        this.setAuthInfo({
          userId: user.id,
          token: pulseTwoContext.token,
        });
        this.setUser(
          Object.assign(Object.assign({}, user), { pulseTwoContext })
        );
        return user;
      }
      throw new Error("Should have not reached here!");
    });
  }
  logout() {
    this.setAuthInfo(null);
    this.setUser(null);
  }
  addLeave(leave) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!__classPrivateFieldGet(this, _isAuthInfoSet).call(this))
        return Promise.reject();
      return axios_1.default({
        url: exports.ADD_LEAVE_URL,
        method: "POST",
        headers: __classPrivateFieldGet(this, _getAuthHeaders).call(this),
        data: [
          Object.assign(
            { userId: __classPrivateFieldGet(this, _authInfo).userId },
            leave
          ),
        ],
      });
    });
  }
  addTime(timeLogs) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!__classPrivateFieldGet(this, _isAuthInfoSet).call(this))
        return Promise.reject();
      timeLogs.forEach(
        (log) => (log.userId = __classPrivateFieldGet(this, _authInfo).userId)
      );
      return axios_1.default({
        url: exports.ADD_TIME_LOG,
        method: "POST",
        headers: __classPrivateFieldGet(this, _getAuthHeaders).call(this),
        data: timeLogs,
      });
    });
  }
}
(_authInfo = new WeakMap()),
  (_user = new WeakMap()),
  (_getAuthHeaders = new WeakMap()),
  (_isAuthInfoSet = new WeakMap());
exports.default = new AiMonitorApi();
//# sourceMappingURL=index.js.map
