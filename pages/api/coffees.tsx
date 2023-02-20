import { NextApiRequest, NextApiResponse } from "next";

import { getCoffees } from "@/lib/coffee";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case "GET":
      const coffees = await getCoffees();
      res.status(200).json(coffees);
      break;
    case "POST":
      break;
    default:
  }
};

export default handler;
