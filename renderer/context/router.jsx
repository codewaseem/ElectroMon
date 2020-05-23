import React, { useState } from "react";

const RouterContext = React.createContext();

export const useRouterContext = () => {
  let routerContext = React.useContext(RouterContext);
  return routerContext;
};

export const ExactRoute = ({ children, match }) => {
  const { path } = useRouterContext();
  return path === match ? children : null;
};

export const RouterProvider = ({ children }) => {
  const [path, setPath] = useState("/precheck");

  return (
    <RouterContext.Provider
      value={{
        path,
        setPath,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};
