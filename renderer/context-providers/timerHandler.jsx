import React, { useContext } from "react";
import useTimerHandler from "../hooks/useTimerManager";
import { TimersManager } from "./timer";
import PropTypes from "prop-types";

const TimerContext = React.createContext({
  timersManager: new TimersManager(),
  stopAndPushTimerData: () => {},
});

export const useTimerHandlerContext = () => {
  return useContext(TimerContext);
};

export const TimerHandlerProvider = ({ children }) => {
  const { timersManager, stopAndPushTimerData } = useTimerHandler();
  return (
    <TimerContext.Provider
      value={{
        timersManager,
        stopAndPushTimerData,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerHandlerProvider.propTypes = {
  children: PropTypes.node,
};
