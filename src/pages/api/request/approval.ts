import type { NextApiRequest, NextApiResponse } from "next";

import Request from "@/services/Request";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  // if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Number(req.query.id);
    const approvals = await Request.getApproval(id);
    return res.status(200).send(approvals);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
