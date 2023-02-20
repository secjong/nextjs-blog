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
