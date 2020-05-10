import { AppProps } from "next/app";
import { TimerProvider } from "../context";

function App({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <Component {...pageProps} />
    </TimerProvider>
  );
}

export default App;
