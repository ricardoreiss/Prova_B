const User = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function LoginModelRoute(req, res) {
  const SECRET_KEY = process.env.SECRET_KEY;

  const { email, password } = req.body;

  const hashed_password = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not exists." });
    } else if (user.password === hashed_password) {
      const token = jwt.sign({ email: user.email, password: user.password }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "User Login.", token: token });
    }

    return res.status(401).json({ error: "Incorrect Password." });
  } catch (error) {
    throw res.status(500).json({ error: "Intern Sevice Error" });
  }
}

module.exports = LoginModelRoute;
