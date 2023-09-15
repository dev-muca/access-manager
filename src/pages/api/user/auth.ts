import type { NextApiRequest, NextApiResponse } from "next";
import { compareSync, compare } from "bcrypt";
import { sign, decode } from "jsonwebtoken";

import UserController from "@/api/controller/user";
import { Errors } from "@/interfaces/errors";

const KEY = String(process.env.SECRET_KEY);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      if (!username) return res.status(400).send({ error: { field: "username", message: "Forneça seu usuário" } });
      if (!password) return res.status(400).send({ error: { field: "password", message: "Forneça sua senha" } });

      const data = await UserController.getInfo(username);

      if (!data.username) return res.status(401).send({ error: { field: data.field, message: data.message } });

      if (data.password) {
        const match = compareSync(password, data.password as string);
        if (!match) return res.status(401).send({ error: { field: "password", message: "Senha inválida" } });
      }

      if (data.field) {
        const { field, message }: Errors = data;
        return res.status(401).send({ error: { field, message } });
      }

      delete data.password;

      const token = sign(data, KEY, { expiresIn: "1h" });

      data.validationToken = token;
      res.status(200).send({ user: data });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    const validationToken = req.query.validationToken;
    const decoded = decode(validationToken as string);

    if (!decoded) res.status(404).send({ error: { field: "validationToken", message: "Token inválido" } });

    res.status(200).send({ user: decoded });
  }
}
