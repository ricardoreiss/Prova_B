const User = require("../models/userModel");
const crypto = require("crypto");

async function SignModelRoute(req, res) {
  const { email, password } = req.body;

  const hashed_password = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(422).json({ error: "User already exists." });
    }

    const newUser = await User.create({
      ...req.body,
      password: hashed_password,
    });

    return res.status(200).json({ message: "User Created." });
  } catch (error) {
    throw res.status(500).json({ error: "Internal Service Error" });
  }
}

module.exports = SignModelRoute;
