const User = require("../models/userMOdel");
const jwt = require("jsonwebtoken");

async function EditDatasModelRoute(req, res) {
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
          const { currentPassword, newPassword } = req.body;

          const hashed_password = crypto
            .createHash("sha256")
            .update(currentPassword)
            .digest("hex");

          if (user.password === hashed_password) {
            const hashed_new_password = crypto
            .createHash("sha256")
            .update(newPassword)
            .digest("hex");

            user.password = hashed_new_password;
            await user.save();

            return res.status(200).json({ error: "Password Changed." });
          }

          return res.status(401).json({ error: "Incorrect Current Password." });
        }
      }
    }

    return res.status(401).json({ error: "Invalid Token." });
  } catch (error) {
    console.error(error);
    throw res.status(500).json({ error: "Intern Sevice Error" });
  }
}

module.exports = EditDatasModelRoute;
