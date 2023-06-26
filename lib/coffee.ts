/**
 * 서버용 fetch 라이브러리
 */
import { Coffee } from "@/types/coffee";

export const getCoffees = async () => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
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
