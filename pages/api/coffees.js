import { getCoffees } from "@/lib/coffee";
export default async function handler(req, res) {
  const coffees = await getCoffees();
  res.status(200).json(coffees);
}
