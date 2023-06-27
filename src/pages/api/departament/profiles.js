import Profile from "@/services/database/profile-methods";

export default async function getUsersProfilesByDepartament(req, res) {
  try {
    const { departament } = req.body;
    const profilesInfos = await Profile.getProfilesByDepartament(departament);
    res.status(200).send({ profilesInfos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: { message: "Erro ao obter dados", more: err.message } });
  }
}
