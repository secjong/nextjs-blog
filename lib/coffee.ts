import useSWR from "swr";

export const getCoffees = async () => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items;
};

export const getCoffee = async (id) => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items.find((item) => {
    return item.id.toString() === id.toString();
  });
};

export const useCoffees = () => {
  const { data, error, isLoading } = useSWR(
    "/api/coffees"
    // { refreshInterval: 1000 }
  );

  return {
    coffees: data,
    error: error,
    isLoading: isLoading,
  };
};

export const useCoffee = (id) => {
  const { data, error, isLoading } = useSWR(
    `/api/coffees/${id}`
    // { refreshInterval: 1000 }
  );

  return {
    coffee: data,
    error: error,
    isLoading: isLoading,
  };
};
