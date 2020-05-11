import React, { useEffect } from "react";
import { TimersManager } from "./timer";
import useTimerData from "../hooks/useTimerData";
import { TIMERS_STORAGE_KEY } from "../../constants";

let timersManager = new TimersManager();

export const TimerContext = React.createContext(timersManager);

export const TimerProvider = ({ children }) => {
  const timersData = useTimerData();
  timersManager = new TimersManager(timersData);

  useEffect(() => {
    const cacheTimer = () => {
      const id = setTimeout(() => {
        localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
        cacheTimer();
      }, 1000);
      return id;
    };
    const id = cacheTimer();
    return () => clearInterval(id);
  }, []);

  return (
    <TimerContext.Provider value={timersManager}>
      {children}
    </TimerContext.Provider>
  );
};
