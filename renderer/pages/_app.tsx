import { AppProps } from "next/app";
import { RootProvider } from "../context";

function App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
}

export default App;
