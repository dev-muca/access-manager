import AD from "@/services/active-directory/methods";

export default async function handler(req, res) {
  try {
    const users = await AD.findAllUsers();
    res.status(200).send({ users });
  } catch (err) {
    res.status(400).send({ error: { message: "Erro ao obter dados" } });
  }
}
