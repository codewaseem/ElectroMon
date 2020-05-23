import React, { useState } from "react";
import { ROUTES } from "../../constants";

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
  const [path, setPath] = useState(ROUTES.UPDATE);

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
