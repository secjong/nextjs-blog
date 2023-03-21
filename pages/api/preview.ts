import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // ...
  res.setPreviewData({});
  // ...
  res.end("Preview mode enabled");
};
export default handler;
