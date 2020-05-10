import React, { useEffect } from "react";
import { TimersManager } from "./timer/timer";
import { ALL_TIMERS } from "../../constants";

const timersManager = new TimersManager();

export const TimerContext = React.createContext(timersManager);

export const TimerProvider = ({ children }) => {
  console.log(timersManager);
  return (
    <TimerContext.Provider value={timersManager}>
      {children}
    </TimerContext.Provider>
  );
};
