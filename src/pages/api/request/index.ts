import { NextApiRequest, NextApiResponse } from "next";

import Request from "@/services/Request";
import IRequest from "@/@types/IRequest";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = Number(req.query.session);
    const status = req.query.status;
    const data = await Request.getRequests(session, status as string);
    res.status(200).send(data);
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { idAccess, idRequester, justification, approverOwner, requestDate, approver }: IRequest = req.body;

    if (!idAccess || !idRequester || !requestDate || !approver?.length)
      return res.status(400).send({ error: { field: "message", message: "Campos ausentes!" } });

    if (!approverOwner && !justification)
      return res.status(400).send({ error: { field: "justification", message: "Preencha a justificativa" } });

    const requestNumber = await Request.createRequest({
      idAccess,
      idRequester,
      justification,
      approverOwner,
      requestDate,
      approver,
    });

    res.status(201).send(requestNumber);
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}
