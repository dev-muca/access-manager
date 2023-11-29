import Access from "@/services/Access";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  const orderBy = req.query.orderBy as string;

  const data = await Access.getAccess(id, orderBy);

  if (!data) return res.status(400).send({ field: "message", message: "Nenhum acesso disponível!" });

  const parseApprover = (approver: string) => {
    const [_id, _fullname] = approver.split("-");
    const id = Number(_id);
    const fullname = String(_fullname);

    return { id, fullname };
  };

  const accesses = data.map((access) => ({
    id: access.id,
    name: access.name,
    description: access.description,
    approver: access.approver.split(";").map(parseApprover),
  }));

  res.status(200).send(accesses);
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  res.send({ ACCESS_POST: true });
}

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const id = Number(req.query.id);
//   const orderBy = req.query.orderBy;
//   const { result, error } = await Accesses.getInfo(id, orderBy as string);

//   if (error) return res.status(500).send({ field: "error", message: error });
//   if (!result?.length) return res.status(400).send({ field: "message", message: "Nenhum acesso disponível!" });

//   const parseApprover = (approver: string) => {
//     const [_id, _fullname] = approver.split("-");
//     const id = Number(_id);
//     const fullname = String(_fullname);

//     return { id, fullname };
//   };

//   const accesses = result.map((access) => ({
//     id: access.id,
//     name: access.name,
//     description: access.description,
//     approver: access.approver.split(";").map(parseApprover),
//   }));

//   res.status(200).send(accesses);
// }
