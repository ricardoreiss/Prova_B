const User = require("../models/userMOdel");
const jwt = require("jsonwebtoken");

async function DeleteUserModelRoute(req, res) {
  const headerToken = req.headers["authorization"];

  try {
    if (headerToken && headerToken.startsWith("Bearer ")) {
      const token = headerToken.substring(7);

      const decodedToken = jwt.decode(token);

      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        const email = decodedToken.email;
        const password = decodedToken.password;

        const user = await User.findOne({ where: { email } });

        if (user && user.password === password) {
          await user.destroy();
          return res.status(200).json({ error: "User Deleted." });
        }
      }
    }

    return res.status(401).json({ error: "Invalid Token." });
  } catch (error) {
    console.error(error);
    throw res.status(500).json({ error: "Intern Sevice Error" });
  }
}

module.exports = DeleteUserModelRoute;