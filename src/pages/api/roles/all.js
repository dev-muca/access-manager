import Role from "@/services/database/role-methods";

export default async function getAllRoles(req, res) {
  try {
    const roles = await Role.getAllRoles();
    res.status(200).send({ roles, error: null });
  } catch (err) {
    res.status(500).send({ roles: null, error: { message: "Erro ao obter dados" } });
  }
}
