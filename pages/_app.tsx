import { AppProps } from 'next/app';

import useSWR, { SWRConfig } from "swr";

import fetcher from "@/util/fetcher";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default App;