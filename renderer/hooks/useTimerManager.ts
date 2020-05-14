import useTimerData from "./useTimerData";
import { TimersManager } from "../context/timer";
import { useEffect } from "react";
import { TIMERS_STORAGE_KEY, TIMERS_HISTORY_KEY } from "../../constants";
import { AiMonitorAPIInterface } from "../context/api";


export default function useTimerManager(aiMonitorApi: AiMonitorAPIInterface) {
    const [timersData, historyData] = useTimerData();
    console.log("init timersManager");
    const timersManager = new TimersManager(timersData, historyData);
    globalThis.timer = timersManager;


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
                let history = timersManager.getHistory();
                if (history.length > 0) {
                    aiMonitorApi
                        .pushLogHistory(history)
                        .then(() => {
                            console.log("History Pushed");
                            console.log("deleting current history");

                            timersManager.deleteHistory();
                        })
                        .catch((e) => {
                            console.log("report error here");
                        });
                } else {
                    console.log("nothing to update");
                }
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
    }, [timersManager]);

    return timersManager;
}

export function saveTimerData(timersManager: TimersManager) {
    localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
    localStorage.setItem(TIMERS_HISTORY_KEY, JSON.stringify(timersManager.getHistory()));
}
