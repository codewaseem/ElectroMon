import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import AutoUpdater, { sendUpdateEventsToWindow } from "./helpers/auto-updater";
import { UPDATER_EVENTS } from "../constants";
// import { createAppUsageTracker } from "ai-monitor-core";
// eslint-disable-next-line no-unused-vars
import desktopIdle from "desktop-idle";
export const isProd = process.env.NODE_ENV === "production";

// const appTracker = createAppUsageTracker(
//   `${app.getPath("userData")}/apptracker`
// );

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow;

(async () => {
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

  await app.whenReady();

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

  let autoUpdater = AutoUpdater.start(sendUpdateEventsToWindow(mainWindow));

  if (!isProd) {
    autoUpdater.emit(UPDATER_EVENTS.UPDATE_NOT_AVAILABLE);
  }

  autoUpdater.on(UPDATER_EVENTS.UPDATE_DOWNLOADED, () => {
    autoUpdater.quitAndInstall(true, true);
  });
  console.log(`${app.getPath("userData")}`);

  // appTracker.start();
  // console.log(await appTracker.getAppsUsageLogs());

  setInterval(() => {
    console.log(desktopIdle.getIdleTime());
  }, 5000);
})();

app.on("window-all-closed", () => {
  app.quit();
  // appTracker.stop();
});
