import AD from "@/services/active-directory/methods";

export default async function handler(req, res) {
  try {
    const departament = req.body.departament;

    if (!!departament && !departament.length) {
      return res.status(400).send({ users: null, error: { message: "Informe o departamento" } });
    }

    const users = await AD.findUsersByDepartament(departament);
    res.status(200).send({ users, error: null });
  } catch (err) {
    console.log(err);
    res.status(400).send({ users: null, error: { message: "Departamento sem colaboradores!" } });
  }
}
