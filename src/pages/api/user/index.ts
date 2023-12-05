import IUser from "@/@types/IUser";
import User from "@/services/User";
import { hashSync } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const order = String(req.query.order);
    const rows = await User.getUsers(order);

    const users = rows?.map((row) => {
      const user: IUser = {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        fullname: row.fullname,
        email: row.email,
        username: row.username,
        streetAddress: row.streetAddress,
        city: row.city,
        state: row.state,
        postalCode: row.postalcode,
        title: row.title,
        office: row.office,
        department: row.department,
        company: row.company,
        telephoneNumber: row.telephoneNumber,
        homeNumber: row.homeNumber,
        description: row.description,
        active: !row.active,
      };

      return user;
    });

    res.status(200).send(users);
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      id,
      internalCode,
      firstName,
      lastName,
      fullname,
      email,
      username,
      password,
      streetAddress,
      city,
      state,
      postalCode,
      title,
      office,
      department,
      company,
      telephoneNumber,
      homeNumber,
      description,
    } = req.body;

    if (!username)
      return res.status(400).send({ error: { field: "username", message: "Obrigatório nome de usuário" } });

    if (!password) return res.status(400).send({ error: { field: "password", message: "Obrigatório uma senha" } });

    if (!fullname)
      return res.status(400).send({ error: { field: "fullname", message: "Obrigatório preencher o nome completo" } });

    if (!id) {
      const created = await User.createUser({
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password: hashSync(password, 16),
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
      });

      if (!created)
        return res.status(404).send({ error: { field: "message", message: "Erro ao cadastrar colaborador" } });

      return res.status(201).send({ action: { message: "Usuário criado com sucesso", id: created } });
    }

    if (id) {
      const updated = await User.updateUser({
        internalCode,
        firstName,
        lastName,
        fullname,
        email,
        username,
        password: hashSync(password, 16),
        streetAddress,
        city,
        state,
        postalCode,
        title,
        office,
        department,
        company,
        telephoneNumber,
        homeNumber,
        description,
      });

      if (!updated)
        return res.status(404).send({ error: { field: "message", message: "Erro ao cadastrar colaborador" } });

      return res.status(201).send({ action: { message: "Usuário criado com sucesso", id: updated } });
    }
  } catch (err: any) {
    res.status(500).send({ error: { field: "message", message: err.message } });
  }
}
