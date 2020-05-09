import React, { useEffect } from "react";
import { DailyTimer } from "./timer/timer";

const timer = new DailyTimer();

export const TimerContext = React.createContext(timer);

export const TimerProvider = ({ children }) => {
  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};
