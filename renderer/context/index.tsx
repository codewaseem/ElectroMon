import React, { useEffect } from "react";
import { TimersManager } from "./timer";
import useTimerData from "../hooks/useTimerData";
import { TIMERS_STORAGE_KEY, TIMERS_HISTORY_KEY } from "../../constants";
import { TestAiMonitorAPI } from "./api";

let timersManager = new TimersManager();
let aiMonitorApi = new TestAiMonitorAPI();

export const TimerContext = React.createContext(timersManager);
export const AiMonitorContext = React.createContext(aiMonitorApi);

export const RootProvider = ({ children }) => {
  const [timersData, historyData] = useTimerData();
  timersManager = new TimersManager(timersData, historyData);
  globalThis.timer = timersManager;

  console.log("from root provider");

  useEffect(() => {
    console.log("called effect");
    const cacheTimer = () => {
      const id = setTimeout(() => {
        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
        localStorage.setItem(
          TIMERS_HISTORY_KEY,
          JSON.stringify(timersManager.getHistory())
        );
        cacheTimer();
      }, 1000 * 5);
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

  return (
    <TimerContext.Provider value={timersManager}>
      <AiMonitorContext.Provider value={aiMonitorApi}>
        {children}
      </AiMonitorContext.Provider>
    </TimerContext.Provider>
  );
};
