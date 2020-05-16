import log from 'electron-log'
import { autoUpdater } from "electron-updater";
import { BrowserWindow } from 'electron';
import { UPDATER_EVENTS } from '../../constants';


autoUpdater.logger = log;
// @ts-ignore
autoUpdater.logger.transports.file.level = 'info';


function defaultUpdateEventHandler(event, eventData) {
    log.info(`Event: ${event}`, typeof eventData == "object" ? JSON.stringify(eventData, null, 2) : eventData);
}


export function sendUpdateEventsToWindow(win: BrowserWindow) {
    return (event, eventData) => {
        if (event === UPDATER_EVENTS.CHECK_FOR_UPDATES) {
            win.webContents.send('message', { event, eventData, text: 'Checking for update...' });
        }

        if (event === UPDATER_EVENTS.UPDATE_AVAILABLE) {
            win.webContents.send('message', { event, eventData, text: 'Update available.' });

        }

        if (event === UPDATER_EVENTS.UPDATE_NOT_AVAILABLE) {
            win.webContents.send('message', { event, eventData, text: 'Update not available.' });

        }

        if (event === UPDATER_EVENTS.ERROR) {
            let text = "Download speed: " + eventData.bytesPerSecond;
            text = text + ' - Downloaded ' + eventData.percent + '%';
            text = text + ' (' + eventData.transferred + "/" + eventData.total + ')';

            win.webContents.send('message', { event, eventData, text });

        }

        if (event === UPDATER_EVENTS.DOWNLOAD_PROGRESS) {
            win.webContents.send('message', { event, eventData, text: 'Update downloaded.' });

        }

        if (event === UPDATER_EVENTS.UPDATE_DOWNLOADED) {
            win.webContents.send('message', { event, eventData, text: 'Update available.' });
        }
    }

}


export default class AutoUpdater {
    private static started: boolean = false;

    static start(onEventCallback: (event, eventData) => void | any = defaultUpdateEventHandler) {
        if (!this.started) {
            this.started = true;
            Object.values(UPDATER_EVENTS).forEach(event => () => {
                autoUpdater.on(event, (eventData) => {
                    onEventCallback(event, eventData);
                });
            });
            autoUpdater.checkForUpdatesAndNotify();
        }
    }
}