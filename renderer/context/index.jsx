import React from "react";
import { TimersManager } from "./timer";
import useTimerManager from "../hooks/useTimerManager";
import { RouterProvider } from "./router";
import PropTypes from "prop-types";

export const TimerContext = React.createContext(new TimersManager());

export const RootProvider = ({ children }) => {
  let timersManager = useTimerManager();

  return (
    <TimerContext.Provider value={timersManager}>
      <RouterProvider>{children}</RouterProvider>
    </TimerContext.Provider>
  );
};

RootProvider.propTypes = {
  children: PropTypes.node,
};
