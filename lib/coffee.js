import useSWR from "swr";

export async function getCoffees() {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items;
}

export async function getCoffee(id) {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items.find((item) => {
    return item.id.toString() === id.toString();
  });
}

export function useCoffees() {
  const { data, error, isLoading } = useSWR(
    "/api/coffees"
    // { refreshInterval: 1000 }
  );

  return {
    coffees: data,
    error: error,
    isLoading: isLoading,
  };
}

export function useCoffee(id) {
  const { data, error, isLoading } = useSWR(
    `/api/coffees/${id}`
    // { refreshInterval: 1000 }
  );

  return {
    coffee: data,
    error: error,
    isLoading: isLoading,
  };
}
