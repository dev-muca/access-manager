import { NextApiRequest, NextApiResponse } from "next";
import AccessController from "@/api/controller/access";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const reqId = req.query.reqId;

  if (req.method === "GET") {
    const data = await AccessController.GetApprover(Number(reqId));
    res.status(200).send({ access: data });
  }

  if (req.method === "POST") {
  }
}
