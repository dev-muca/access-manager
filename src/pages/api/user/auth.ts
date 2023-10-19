import { compareSync } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import User from "@/services/User";
import IUser from "@/@types/IUser";

const KEY = String(process.env.SECRET_KEY);

export default async function handleHttp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") GET(req, res);
  if (req.method === "POST") POST(req, res);
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validationToken = req.query.validationToken as string;
    const decoded = decode(validationToken);

    if (!decoded) return res.status(401).send({ error: { field: "validationToken", message: "Token inválido" } });

    res.status(200).send(decoded);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    if (!username) return res.status(400).send({ error: { field: "username", message: "Forneça seu usuário" } });
    if (!password) return res.status(400).send({ error: { field: "password", message: "Forneça sua senha" } });

    const data = await User.getUser(username);
    if (!data) return res.status(401).send({ error: { field: "username", message: "Usuário inválido" } });

    const row = data![0];
    const user: IUser = {
      id: row.id,
      internalCode: row.internalCode,
      firstName: row.firstName,
      lastName: row.lastName,
      fullname: row.fullname,
      email: row.email,
      username: row.username,
      password: row.password,
      streetAddress: row.streetAddress,
      city: row.city,
      state: row.state,
      postalCode: row.postalCode,
      title: row.title,
      office: row.office,
      department: row.department,
      company: row.company,
      telephoneNumber: row.telephoneNumber,
      homeNumber: row.homeNumber,
      description: row.description,
      active: row.active ? true : false,
    };

    if (user.password) {
      const match = compareSync(password, user.password);
      if (!match) return res.status(401).send({ error: { field: "password", message: "Senha inválida" } });
    }

    delete user.password;
    const token = sign(user, KEY, { expiresIn: "1h" });

    user.validationToken = token;
    res.status(200).send({ user });
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
