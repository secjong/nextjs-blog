import { getCoffee } from "@/lib/coffee";

export default async function handler(req, res) {
  const id = req.query.id.toString();
  const coffee = await getCoffee(id);
  res.status(200).json(coffee);
}
