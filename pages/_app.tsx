import { useState, useEffect } from "react";
import { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import useSWR, { SWRConfig } from "swr";

import fetcher from "@/util/fetcher";

import "../styles/globals.css";

/*
리엑트 쿼리는 다음 상황에서 기존 데이터를 stale되었다고 판단하고 다시 업데이트 한다.(이하 revalidate)

새로운 쿼리 인스턴스
윈도우가 다시 포커스 되었을 때 (탭전환등)
네트워크가 끊겼다가 다시 연결되었을 때
refetch interval 설정에 따라 다시 데이터를 호출할 때
 */

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 20, // 기본값: 0. 캐싱된 데이터가 fresh -> stale 상태로 변경되는 시간. fresh 상태의 데이터는 refetch가 자동으로 일어나지 않는다.
        // cacheTime: Infinity, // 기본값: 1000 * 60 * 5. Query Instance가 unmount 되면 데이터가 inactive 상태가 되는데, inactvie 상태일 때 데이터가 캐싱된 상태로 남아있는 시간. 이 시간이 지나면 가비지 콜렉터로 수집된다.
      }
    }
  })); // 컴포넌트가 생성될때마다 새로운 QueryClient 인스턴스를 생성한다.(이렇게 해야 서버사이드에서 상태관리 인스턴스가 독립적으로 생성됨)
  return (
    // 생성된 queryClient 를  React Context에 넣어 앱 전체에 배포한다.
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;