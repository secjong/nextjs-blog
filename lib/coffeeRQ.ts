/**
 * 서버용 React Query 라이브러리
 */
import { Coffee } from "@/types/coffee";

export const getCoffees = async () => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items;
};

export const getCoffee = async (id: number) => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  const items = await response.json();

  return items.find((item: Coffee) => {
    return item.id.toString() === id.toString();
  });
};
