import { compareSync } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import UserController from "@/api/controller/user";

const KEY = String(process.env.SECRET_KEY);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      if (!username) return res.status(400).send({ error: { field: "username", message: "Forneça seu usuário" } });
      if (!password) return res.status(400).send({ error: { field: "password", message: "Forneça sua senha" } });

      const { user, error } = await UserController.getInfo(username);

      if (error) {
        const { code, field, message } = error;
        return res.status(code).send({ error: { field, message } });
      }

      if (!user) return res.status(401).send({ error: { field: "username", message: "Usuário inválido" } });

      if (user?.password) {
        const match = compareSync(password, user?.password);
        if (!match) return res.status(401).send({ error: { field: "password", message: "Senha inválida" } });
      }

      delete user?.password;
      const token = sign(user, KEY, { expiresIn: "1h" });

      user.validationToken = token;
      res.status(200).send({ user });
    } catch (err) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    const validationToken = req.query.validationToken as string;
    const decoded = decode(validationToken);

    if (!decoded) res.status(401).send({ error: { field: "validationToken", message: "Token inválido" } });

    res.status(200).send({ user: decoded });
  }
}
