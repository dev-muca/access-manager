import AccessController from "@/api/controller/access";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = await AccessController.GetAll();

    res.status(200).send({ accesses: data });
  }
  if (req.method === "POST") {
  }
}
