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
    const id = setInterval(() => {
      console.log("updating cache");
      localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timersManager));
    }, 1000 * 10);

    return () => clearInterval(id);
  }, []);

  return (
    <TimerContext.Provider value={timersManager}>
      {children}
    </TimerContext.Provider>
  );
};
