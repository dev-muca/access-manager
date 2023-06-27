// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import AD from "@/services/active-directory/methods";
import Dept from "@/services/database/dept-methods";
import Profile from "@/services/database/profile-methods";
import User from "@/services/database/user-methods";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

const KEY = process.env.SECRET_KEY;

export default async function authentication(req, res) {
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

    const activedirectoryUserInfo = await AD.findUser(username);

    // Validação usuário inválido
    if (!activedirectoryUserInfo) {
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

    const authData = await User.getAuthDataByUsername(username);
    let token;
    let user;

    // Se o usuário existir no AD e não existir no DB, registra ele no banco
    if (!authData) {
      await Dept.createDepartament(activedirectoryUserInfo.departament);

      const hash = hashSync(password, 16);

      const id = await User.createUser({ username, password: hash, ...activedirectoryUserInfo });

      const tokenData = {
        id,
        role: null,
        avatar: null,
        ...activedirectoryUserInfo,
      };

      token = sign(tokenData, KEY, { expiresIn: "1d" });
      // user = tokenData;
    } else {
      const match = compareSync(password, authData.password);

      if (!match) {
        await User.updatePasswordByUsername(username);
      }

      const [tokenData] = await User.getAllUserDataByUsername(username);

      token = sign(tokenData, KEY, { expiresIn: "1h" });
      // user = tokenData;
    }

    return res.status(200).send({ token, error: null });
  } catch (err) {
    // Tratar e responder aos erros adequadamente
    console.error(err);
    return res.status(500).send({
      token: null,
      error: {
        message: "Ocorreu um erro no servidor",
        more: err.message,
      },
    });
  }
}
