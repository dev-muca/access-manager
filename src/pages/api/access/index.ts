import AccessController from "@/api/controller/access";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const reqId = req.query.reqId;

  if (req.method === "GET") {
    const data = await AccessController.GetInfo(Number(reqId));
    res.status(200).send({ accesses: data });
  }

  if (req.method === "POST") {
  }
}
