import AD from "@/services/active-directory/methods";

export default async function handler(req, res) {
  try {
    const users = await AD.findAllUsers();
    res.status(200).send({ users, error: null });
  } catch (err) {
    res.status(400).send({ users: null, error: { message: "Erro ao obter dados" } });
  }
}
