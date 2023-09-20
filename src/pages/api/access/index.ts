import { NextApiRequest, NextApiResponse } from "next";
import AccessController from "@/api/controller/access";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const reqId = req.query.reqId;
      const { access, error } = await AccessController.getInfo(Number(reqId));

      if (error) {
        const { code, field, message } = error;
        res.status(code).send({ error: { field: field, message: message } });
      }

      res.status(200).send({ access });
    } catch (err: any) {
      res.status(400).send({ error: { field: "message", message: err.message } });
    }
  }
}
