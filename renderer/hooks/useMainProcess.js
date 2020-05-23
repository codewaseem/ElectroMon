import { useAiMonitorAPI } from "./index";
import { AUTH_DATA_KEY } from "../../constants";

const { remote, ipcRenderer } = eval(`require('electron')`);

let mainModule = null;
let authModule = null;

if (remote) {
  mainModule = remote.require("./main");
  authModule = remote.require("./auth").default;
}

export function getAppVersion() {
  if (mainModule) {
    return mainModule.appVersion;
  }
  return null;
}

export function getIpcRenderer() {
  return ipcRenderer;
}

export function useAuth0Login() {
  const api = useAiMonitorAPI();

  return async () => {
    let token = await authModule.getToken();
    let authUserData = await authModule.getUserInfo(token);
    let userInfo = await api.fetchUserDetails(token, authUserData.sub);
    localStorage.setItem(
      AUTH_DATA_KEY,
      JSON.stringify({ token, authUserData, userInfo })
    );

    return {
      token,
      authUserData,
    };
  };
}

export function useLogout() {
  return async () => {
    localStorage.setItem(AUTH_DATA_KEY, null);
    return true;
  };
}

export function isDev() {
  return !mainModule.isProd;
}

export function useCloseWindow() {
  if (remote) {
    let window = remote.getCurrentWindow();
    return () => window.close();
  }
}
