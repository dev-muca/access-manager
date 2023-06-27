import Dept from "@/services/database/dept-methods";

export default async function createDepartament(req, res) {
  try {
    const name = req.body.name;

    if (!name) return res.status(400).send({ created: null, error: { message: "Forneça um nome" } });

    const alreadyExists = await Dept.getDepartamentByName(name);

    if (!!alreadyExists)
      return res.status(400).send({ created: null, error: { message: "Este departamento já existe" } });

    const id = await Dept.createDepartament(name);

    res.status(201).send({ created: { message: "Departamento criado", id }, error: null });
  } catch (err) {
    res.status(500).send({ created: null, error: { message: "Erro ao criar departamento.", more: err.message } });
  }
}
