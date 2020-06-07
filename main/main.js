import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import AutoUpdater, { sendUpdateEventsToWindow } from "./helpers/auto-updater";
import { UPDATER_EVENTS, IPC_CHANNELS } from "../constants";
import createAppUsageTracker from "ai-monitor-core/dist/activity-tracker";
import { rmdirSync } from "fs";

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
    const startLogging = () => {
      trackerTimeoutId = setTimeout(async () => {
        console.log(await appTracker.getAppsUsageLogs());
        startLogging();
      }, 5000);
    };

    startLogging();
  } catch (e) {
    console.log("ERROR while starting the apptracker");
    console.log(e);
  }
});

ipcMain.on(IPC_CHANNELS.STOP_TRACKING, () => {
  try {
    console.log("tracking started");
    clearTimeout(trackerTimeoutId);
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

app.on("window-all-closed", () => {
  appTracker.stop();
  app.quit();
});

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

ipcMain.on(IPC_CHANNELS.SET_CURRENT_USER, (_, profile) => {
  appTracker.setUserProfile(profile);
});
