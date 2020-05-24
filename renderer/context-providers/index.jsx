import React from "react";
import { RouterProvider } from "./router";
import { TimerHandlerProvider } from "./timerHandler";
import PropTypes from "prop-types";

export const RootProvider = ({ children }) => {
  return (
    <TimerHandlerProvider>
      <RouterProvider>{children}</RouterProvider>
    </TimerHandlerProvider>
  );
};

RootProvider.propTypes = {
  children: PropTypes.node,
};
