import { AppProps } from "next/app";
import "../theme/antd-custom.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
