/**
 * 클라이언트용 fetch 라이브러리
 */
import useSWR from "swr";

const fetchData = (apiRoutePath: string) => {
  const { data, error, isLoading } = useSWR(
    `/api${apiRoutePath}`
    // { refreshInterval: 1000 }
  );

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
};

export const useCoffees = () => {
  return fetchData("/coffees");
};

export const useCoffee = (id: number) => {
  return fetchData(`/coffees/${id}`);
};
