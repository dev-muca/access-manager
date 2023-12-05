import Approvals from "@/pages/Approvals";
import Access from "@/services/Access";
import ActiveDirectoryService from "@/services/ActiveDirectory/activedirectory.service";
import Approver from "@/services/Approver";
import User from "@/services/User";
import { NextApiRequest, NextApiResponse } from "next";

interface IGroupAD {
  dn: string;
  cn: string;
  description?: string;
}

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obter grupos do Active Directory e do banco de dados
    const groupsAD = await ActiveDirectoryService.getGroups();
    const groupsBD = await Access.getAccesses();

    // Verificar se há grupos do AD
    if (groupsAD && groupsAD.length > 0) {
      // Filtrar grupos ausentes no banco de dados
      const missingGroups = groupsAD.filter(
        (groupAD: IGroupAD) => !groupsBD?.some((groupBD) => groupAD.cn === groupBD.name)
      );

      // Inserir grupos ausentes no banco de dados e definir os aprovadores
      if (missingGroups.length > 0) {
        for (const missingGroup of missingGroups) {
          const insertedId = await Access.createAccess(missingGroup.cn, missingGroup.description);
          if (insertedId != null) await Approver.setApprover(insertedId, 1);
        }
      }

      // Retornar os grupos do banco de dados
      return res.status(201).send(groupsBD);
    } else {
      return res.status(200).send({
        Error: { field: "message", message: "Erro tentar realziar integração dos grupos do AD para o BANCO" },
      });
    }
  } catch (err: any) {
    // Tratar erros
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}
