import AD from "@/services/active-directory/methods";

export default async function getMembersDepartament(req, res) {
  try {
    const departament = req.body.departament;

    const members = await AD.findUsersByDepartament(departament);

    if (!members.length)
      return res.status(404).send({ members, error: { message: "Sem colaboradores e/ou departamento não existe" } });

    res.status(200).send({ members, error: null });
  } catch (err) {
    console.log(err);
    res.status(500).send({ members, error: { message: "Erro ao obter dados", more: err.message } });
  }
}
