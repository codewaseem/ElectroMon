import React from "react";
import { TimersManager } from "./timer";
import { TestAiMonitorAPI } from "./api";
import useTimerManager from "../hooks/useTimerManager";

let aiMonitorApi = new TestAiMonitorAPI();

export const TimerContext = React.createContext(new TimersManager());
export const AiMonitorContext = React.createContext(aiMonitorApi);

export const RootProvider = ({ children }) => {
  let timersManager = useTimerManager(aiMonitorApi);

  return (
    <TimerContext.Provider value={timersManager}>
      <AiMonitorContext.Provider value={aiMonitorApi}>
        {children}
      </AiMonitorContext.Provider>
    </TimerContext.Provider>
  );
};