import { compareSync } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/services/User";
import IUser from "@/@types/IUser";

const KEY = String(process.env.SECRET_KEY);

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  // if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Number(req.query.id);
    const status = req.query.status;
    const approvals = await User.getApprovals(id, status as string);
    return res.status(200).send(approvals);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
