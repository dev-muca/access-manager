import Profile from "@/services/database/profile-methods";

export default async function getUserProfileInfo(req, res) {
  try {
    const username = req.query.username;
    const profileInfo = await Profile.getProfileInfoByUsername(username);
    res.status(200).send({ profileInfo: profileInfo[0] });
  } catch (err) {
    console.log(err);
  }
}
