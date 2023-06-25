import { verify } from "jsonwebtoken";

const KEY = process.env.SECRET_KEY;

export default async function decodeToken(req, res) {
  try {
    const token = req.query.token;
    const data = verify(token, KEY);
    res.status(200).send({ data, error: null });
  } catch (err) {
    res.status(400).send({ error: { message: "Forneça um token válido!" } });
  }
}
