import { RootProvider } from "../context-providers";
import PropTypes from "prop-types";
import React from "react";

function App({ Component, pageProps }) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.any,
};

export default App;
