import { NextApiRequest, NextApiResponse } from "next";
import AccessController from "@/api/controller/access";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const reqId = Number(req.query.reqId);
      const { access, error } = await AccessController.getApprover(reqId);

      if (error) throw new Error(error.message);

      res.status(200).send({ access });
    } catch (err: any) {
      res.status(400).send({ error: { field: "message", message: err.message } });
    }
  }

  if (req.method === "POST") {
  }
}
