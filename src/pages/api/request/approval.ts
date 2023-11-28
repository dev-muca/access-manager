import type { NextApiRequest, NextApiResponse } from "next";

import Request from "@/services/Request";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Number(req.query.id);
    const approvals = await Request.getApproval(id);
    res.status(200).send(approvals);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { approvalId, approvalDate, comment, status } = req.body;

    if (!status && !comment)
      return res.status(400).send({
        error: {
          field: "comment",
          message: "Por estar reprovando a solicitação, é obrigatório que seja justificado.",
        },
      });

    // console.log({ approvalId, approvalDate, comment, status });
    // res.end();

    const affectedRows = await Request.setApproval({
      approvalId,
      approvalDate,
      comment,
      status: status ? "Aprovado" : "Reprovado",
    });

    res.status(200).send({ update: affectedRows });
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
