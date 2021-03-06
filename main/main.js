import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import AutoUpdater, { sendUpdateEventsToWindow } from "./helpers/auto-updater";
import { UPDATER_EVENTS, IPC_CHANNELS } from "../constants";
import createAppUsageTracker from "ai-monitor-core/dist/activity-tracker";
import { aiMonitorApi } from "ai-monitor-core";
import { rmdirSync } from "fs";
import log from "electron-log";

console.log = log.log;

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
  // this was needed to avoid crashing app the app in dev mode.
  rmdirSync(app.getPath("userData") + "/apptracker", { recursive: true });
}

let mainWindow;
let appTracker;

let trackerTimeoutId;

ipcMain.on(IPC_CHANNELS.START_TRACKING, () => {
  try {
    console.log("tracking started");
    appTracker.start();
    const startPushingLogs = () => {
      trackerTimeoutId = setTimeout(async () => {
        await pushAppsUsageToServer();
        startPushingLogs();
      }, 1000 * 60 * 5);
    };

    startPushingLogs();
  } catch (e) {
    console.log("ERROR while starting the apptracker");
    console.log(e);
  }
});

ipcMain.on(IPC_CHANNELS.STOP_TRACKING, async () => {
  try {
    console.log("tracking stop");
    clearTimeout(trackerTimeoutId);
    await pushAppsUsageToServer();
    appTracker.stop();
  } catch (e) {
    console.log("ERROR while stopping the apptracker");
    console.log(e);
  }
});

(async () => {
  preventMultipleInstances();

  await app.whenReady();

  await loadApp();

  initAutoUpdater();
  await initAppTracker();
})();

app.on("window-all-closed", async () => {
  appTracker.stop();
  await pushAppsUsageToServer();
  app.quit();
});

async function pushAppsUsageToServer() {
  const history = appTracker.getChangedHistory();
  if (history && history.length) {
    console.log("PUSHING USAGE HISTORY");
    try {
      console.log("PUSHING", history);
      const data = await aiMonitorApi.pushAppUsageHistory(history);
      console.log("PUSHED", data);
    } catch (e) {
      console.log(e);
      console.log("SOMETHING WENT WRONG");
    }
  }
}

async function initAppTracker() {
  console.log(app.getPath("userData"));
  try {
    appTracker = createAppUsageTracker(
      `${app.getPath("userData")}/apptracker`
    );
    await appTracker.init();
  } catch (e) {
    console.log("ERROR CAUGHT:");
    console.log(e);
  }
}

async function loadApp() {
  mainWindow = createWindow("main", {
    height: 490,
    width: 800,
    minWidth: 760,
    maxWidth: 780,
    minHeight: 490,
    maxHeight: 500,
    title: `ApTask AiMonitor - v${app.getVersion()}`,
    autoHideMenuBar: isProd ? true : false,
  });
  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
}

function initAutoUpdater() {
  let autoUpdater = AutoUpdater.start(sendUpdateEventsToWindow(mainWindow));
  if (!isProd) {
    autoUpdater.emit(UPDATER_EVENTS.UPDATE_NOT_AVAILABLE);
  }
  autoUpdater.on(UPDATER_EVENTS.UPDATE_DOWNLOADED, () => {
    autoUpdater.quitAndInstall(true, true);
  });
}

function preventMultipleInstances() {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }
}

ipcMain.on(IPC_CHANNELS.SET_CURRENT_USER, (_, { user, profile }) => {
  console.log("USER SET");
  aiMonitorApi.setUser(user);
  aiMonitorApi.setAuthInfo({
    userId: user.id,
    token: JSON.parse(user.pulseTwoContext).token,
  });
  appTracker.setUserProfile(profile);
});
