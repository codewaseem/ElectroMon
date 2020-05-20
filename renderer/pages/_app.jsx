import { RootProvider } from "../context";

function App({ Component, pageProps }) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}

export default App;
