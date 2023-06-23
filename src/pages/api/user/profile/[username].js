import Profile from "@/services/database/profile-methods";

export default async function handler(req, res) {
  try {
    const username = req.query.username;
    const profileInfo = await Profile.getProfileInfoByUsername(username);
    res.status(200).send({ profileInfo });
  } catch (err) {
    console.log(err);
  }
}
