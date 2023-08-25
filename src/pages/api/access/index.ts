import { NextApiRequest, NextApiResponse } from "next";
import AccessController from "@/api/controller/access";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const reqId = req.query.reqId;

  try {
    const data = await AccessController.getInfo(Number(reqId));
    res.status(200).send({ access: data });
  } catch (err: any) {
    res.status(400).send({ error: { field: "message", message: err.message } });
  }
}