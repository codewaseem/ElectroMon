const electron = eval(`require('electron')`);

const remote = electron.remote || false;

let appVersion = '';

if (remote) {
    const mainProcess = remote.require('./main');
    appVersion = mainProcess.appVersion;
}

export default function useAppVersion() {
    return appVersion;
}