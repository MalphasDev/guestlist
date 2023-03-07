import bcrypt from "bcrypt";
import Team from "../../models/team";

export default async function register(req, res) {
  const body = req.body;
  const userExist = await Team.findOne({ name: body.name });
  if (userExist) {
    res.status.json({ message: "Bereits vorhanden." });
    console.warn("Bereits vorhanden.");
    return;
  }
  const user = new Team(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(200).json({ message: "Registrierung erfolgreich" });
}
