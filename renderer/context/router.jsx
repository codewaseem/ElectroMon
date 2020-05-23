import React, { useState } from "react";

const RouterContext = React.createContext();

export const useRouterContext = () => {
  let routerContext = React.useContext(RouterContext);
  return routerContext;
};

export const ExactRoute = ({ children: Children, match }) => {
  const { path } = useRouterContext();
  console.log(path, match);
  return path === match ? Children : null;
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
