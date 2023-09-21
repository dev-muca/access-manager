import { NextApiRequest, NextApiResponse } from "next";
import AccessController from "@/api/controller/access";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { access, error } = await AccessController.getInfo();

    if (error) {
      const { code, field, message } = error;
      res.status(code).send({ error: { field: field, message: message } });
    }

    res.status(200).send({ access });
  } catch (err: any) {
    res.status(400).send({ error: { field: "message", message: err.message } });
  }
}
