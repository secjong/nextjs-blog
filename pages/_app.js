import useSWR, { SWRConfig } from "swr";

import fetcher from "@/util/fetcher";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
