import log from "electron-log";
import { autoUpdater } from "electron-updater";
import { UPDATER_EVENTS } from "../../constants";

autoUpdater.logger = log;
// @ts-ignore
autoUpdater.logger.transports.file.level = "info";

function defaultUpdateEventHandler(event, eventData) {
  log.info(
    `Event: ${event}`,
    typeof eventData == "object"
      ? JSON.stringify(eventData, null, 2)
      : eventData
  );
}

export function sendUpdateEventsToWindow(win) {
  return (event, eventData) => {
    log.info(
      `Event: ${event}`,
      typeof eventData == "object"
        ? JSON.stringify(eventData, null, 2)
        : eventData
    );

    if (event === UPDATER_EVENTS.CHECK_FOR_UPDATES) {
      win.webContents.send("message", {
        event,
        eventData,
        text: "Checking for update...",
      });
    }

    if (event === UPDATER_EVENTS.UPDATE_AVAILABLE) {
      win.webContents.send("message", {
        event,
        eventData,
        text: "Update available.",
      });
    }

    if (event === UPDATER_EVENTS.UPDATE_NOT_AVAILABLE) {
      win.webContents.send("message", {
        event,
        eventData,
        text: "Update not available.",
      });
    }

    if (event === UPDATER_EVENTS.ERROR) {
      win.webContents.send("message", {
        event,
        eventData,
        text: "Error while updating.",
      });
    }

    if (event === UPDATER_EVENTS.DOWNLOAD_PROGRESS) {
      let text = "Download speed: " + eventData.bytesPerSecond;
      text = text + " - Downloaded " + eventData.percent + "%";
      text = text + " (" + eventData.transferred + "/" + eventData.total + ")";

      win.webContents.send("message", { event, eventData, text });
    }

    if (event === UPDATER_EVENTS.UPDATE_DOWNLOADED) {
      win.webContents.send("message", {
        event,
        eventData,
        text: "Update downloaded.",
      });
    }
  };
}

export default class AutoUpdater {
  static start(onEventCallback = defaultUpdateEventHandler) {
    this.started = true;
    autoUpdater.checkForUpdatesAndNotify();
    Object.values(UPDATER_EVENTS).forEach((event) => {
      autoUpdater.on(event, (eventData) => {
        log.info("EVENT: ", event, eventData);
        onEventCallback(event, eventData);
      });
    });
    return autoUpdater;
  }
}
