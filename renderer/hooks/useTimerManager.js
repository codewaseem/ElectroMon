import useTimerData from "./useTimerData";
import { TimersManager } from "../context-providers/timer";
import { useEffect } from "react";
import { TIMERS_STORAGE_KEY, TIMERS_HISTORY_KEY } from "../../constants";
import { aiMonitorApi } from "ai-monitor-core";
import { getIpcRenderer } from "./useMainProcess";
import { IPC_CHANNELS } from "../../constants";

const ipcRenderer = getIpcRenderer();

export default function useTimerHandler() {
  const [timersData, historyData] = useTimerData();
  const timersManager = new TimersManager(timersData, historyData);

  const pushTimerData = () => {
    let history = timersManager.getHistory();
    if (history.length > 0) {
      return (
        aiMonitorApi
          .addTime(history)
          .then(() => {
            console.log("History Pushed");
            console.log("deleting current history");
            timersManager.deleteHistory();
            return true;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((e) => {
            console.log(e);
            console.log("report error here");
            return false;
          })
      );
    } else {
      console.log("nothing to update");
      return Promise.resolve(true);
    }
  };

  useEffect(() => {
    const cacheTimer = () => {
      const id = setTimeout(() => {
        saveTimerData(timersManager);
        cacheTimer();
      }, 1000);
      return id;
    };

    const syncHistoryWithServer = () => {
      const id = setTimeout(() => {
        pushTimerData();
        syncHistoryWithServer();
      }, 1000 * 5);

      return id;
    };

    const timerId = cacheTimer();
    const syncHistoryId = syncHistoryWithServer();

    return () => {
      console.log("timer cleared");
      clearTimeout(timerId);
      clearTimeout(syncHistoryId);
    };
  }, [aiMonitorApi, timersManager, pushTimerData]);

  return {
    timersManager,
    stopAndPushTimerData: async () => {
      ipcRenderer.send(IPC_CHANNELS.STOP_TRACKING);
      timersManager.stopTimer();
      return pushTimerData();
    },
  };
}

export function saveTimerData(timersManager) {
  localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
  localStorage.setItem(
    TIMERS_HISTORY_KEY,
    JSON.stringify(timersManager.getHistory())
  );
}
