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

  useEffect(() => {
    const cacheTimer = () => {
      const id = setTimeout(() => {
        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
        localStorage.setItem(
          TIMERS_HISTORY_KEY,
          JSON.stringify(timersManager.getHistory())
        );
        cacheTimer();
      }, 1000);
      return id;
    };
    const id = cacheTimer();
    return () => clearInterval(id);
  }, []);

  return (
    <TimerContext.Provider value={timersManager}>
      <AiMonitorContext.Provider value={aiMonitorApi}>
        {children}
      </AiMonitorContext.Provider>
    </TimerContext.Provider>
  );
};
