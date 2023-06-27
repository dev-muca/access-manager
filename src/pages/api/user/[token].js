import Profile from "@/services/database/profile-methods";
import { verify } from "jsonwebtoken";

const KEY = process.env.SECRET_KEY;

export default async function decodeToken(req, res) {
  try {
    const token = req.query.token;
    const tokenContent = verify(token, KEY);

    if (!tokenContent) return res.status(400).send({ data: null, error: { message: "Forneça um token válido" } });

    const [data] = await Profile.getProfileInfoByUserId(tokenContent.id);

    res.status(200).send({ data, error: null });
  } catch (err) {
    res.status(500).send({ error: { message: "Erro ao verificar token!", more: err.message } });
  }
}
