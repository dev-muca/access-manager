import Profile from "@/services/database/profile-methods";

export default async function postUserProfileInfo(req, res) {
  try {
    const { username, data } = req.body;
    const updated = await Profile.updateProfileInfoByUsername(data, username);
    if (!updated) return res.status(400).send({ success: null, error: { message: "Erro ao atualizar perfil" } });
    res.status(200).send({ success: { updated, message: "Dados do perfil atualizados" }, error: null });
  } catch (err) {
    res.status(500).send({ success: null, error: { message: "Erro ao tentar atualizar dados", more: err.message } });
    return null;
  }
}
