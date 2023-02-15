import { NextApiRequest, NextApiResponse } from 'next';

import { getCoffees } from "@/lib/coffee";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const coffees = await getCoffees();
  res.status(200).json(coffees);
};

export default handler;
