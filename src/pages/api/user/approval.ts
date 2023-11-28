import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/services/User";
import { RowDataPacket } from "mysql2";

const KEY = String(process.env.SECRET_KEY);

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  // if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    let lastModified = new Date();

    if (req.headers["if-modified-since"] && new Date(req.headers["if-modified-since"]) >= lastModified) {
      return res.status(304).end();
    }

    const userId = Number(req.query.userId);
    const status = req.query.status;
    const result = await User.getApprovals(userId, status as string);

    const approvals = result?.map((row: RowDataPacket) => {
      return {
        approvalId: row.approvalId,
        requestId: row.requestId,
        accessName: row.accessName,
        accessDescription: row.accessDescription,
        requestDate: row.requestDate,
        justification: row.justification ? row.justification : null,
        approverOwner: row.approverOwner ? true : false,
        requesterId: row.requesterId,
        requesterName: row.requesterName,
        status: row.status,
      };
    });

    res.setHeader("Last-Modified", lastModified.toLocaleString());
    return res.status(200).send(approvals);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

/* 

let lastModified = new Date(); // Defina a última modificação inicialmente

app.get('/seu_endpoint', (req, res) => {
  // Verifique se os dados foram modificados desde a última requisição
  // Se não houver modificação, envie um código de status 304 (Not Modified)
  if (req.headers['if-modified-since'] && new Date(req.headers['if-modified-since']) >= lastModified) {
    return res.status(304).end();
  }

  // Se houver modificação, envie os dados com o cabeçalho Last-Modified
  res.set('Last-Modified', lastModified.toUTCString());

  // Aqui você enviaria os dados como resposta (exemplo com JSON)
  res.json({ data: 'Seus dados aqui' });
});

*/
