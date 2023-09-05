import RequestController from "@/api/controller/request";
import { Request } from "@/interfaces/request";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const reqId = Number(req.query.reqId);
      const data = await RequestController.getRequests(reqId);
      res.status(200).send({ requests: data });
    } catch (err: any) {
      res.status(500).send({ error: { field: "message", message: err.message } });
    }
  }

  if (req.method === "POST") {
    try {
      const { idAccess, idRequester, justification, approverOwner, requestDate, approver }: Request = req.body;

      //console.log("API RECEIVED:", { idAccess, idRequester, justification, approverOwner, requestDate, approver });

      if (!idAccess || !idRequester || !requestDate || !approver?.length)
        return res.status(400).send({ error: { field: "message", message: "Campos ausentes!" } });

      if (!approverOwner && !justification)
        return res.status(400).send({ error: { field: "justification", message: "Preencha a justificativa" } });

      const requestNumber = await RequestController.createRequest({
        idAccess,
        idRequester,
        justification,
        approverOwner,
        requestDate,
        approver,
      });

      res.status(201).send({ requestNumber });
    } catch (err: any) {
      res.status(500).send({ error: { field: "message", message: err.message } });
    }
  }
}
