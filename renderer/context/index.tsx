import React, { useEffect } from "react";
import { DatedTimer } from "./timer/timer";

const timer = new DatedTimer();

export const TimerContext = React.createContext(timer);

export const TimerProvider = ({ children }) => {
  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};
