import RequestController from "@/api/controller/request";
import { IRequest } from "@/interfaces/request";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { idAccess, idRequester, justification, approverOwner, requestDate, approver }: IRequest = req.body;

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
    } catch (err: any) {}
  }
}
