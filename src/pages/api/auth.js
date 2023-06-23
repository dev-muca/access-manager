// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import AD from "@/services/active-directory/methods";
import DB from "@/services/database/methods";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

const KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    // Validação usuário vazio
    if (!username) {
      return res.status(400).send({
        token: null,
        user: null,
        error: {
          field: "username",
          message: "Forneça um usuário",
        },
      });
    }

    // Validação senha vazia
    if (!password) {
      return res.status(400).send({
        token: null,
        user: null,
        error: {
          field: "password",
          message: "Forneça uma senha",
        },
      });
    }

    const dataAD = await AD.findUser(username);

    // Validação usuário inválido
    if (!dataAD) {
      return res.status(401).send({
        token: null,
        user: null,
        error: {
          field: "username",
          message: "Usuário inválido",
        },
      });
    }

    const isAuth = await AD.authenticate(username, password);

    // Validação senha inválida
    if (!isAuth) {
      return res.status(401).send({
        token: null,
        user: null,
        error: {
          field: "password",
          message: "Senha inválida",
        },
      });
    }

    const dataDB = await DB.getUserByUsername(username);
    let token;
    let user;

    if (!dataDB) {
      const { email, fullname, departament } = dataAD;

      const hashedPassword = hashSync(password, 16);

      const id = await DB.createUser({ email, username, fullname, password: hashedPassword, departament });

      const payload = {
        id,
        ...dataAD,
      };

      token = sign(payload, KEY, { expiresIn: "1d" });
      user = payload;
    } else {
      const { id, email, fullname, departament } = dataDB;

      const match = compareSync(password, dataDB.password);

      if (!match) {
        await DB.updatePasswordByUsername(username);
      }

      token = sign({ id, email, username, fullname, departament }, KEY, { expiresIn: "1d" });
      user = { id, email, username, fullname, departament };
    }

    return res.status(200).send({ token, user, error: null });
  } catch (err) {
    // Tratar e responder aos erros adequadamente
    console.error(err);
    return res.status(500).send({
      token: null,
      user: null,
      error: {
        message: "Ocorreu um erro no servidor",
      },
    });
  }
}
