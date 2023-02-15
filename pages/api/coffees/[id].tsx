import { NextApiRequest, NextApiResponse } from 'next';

import { getCoffee } from "@/lib/coffee";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id.toString();
  const coffee = await getCoffee(id);
  res.status(200).json(coffee);
};

export default handler;
