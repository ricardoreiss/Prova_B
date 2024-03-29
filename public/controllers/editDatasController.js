const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function EditDatasModelRoute(req, res) {
  const SECRET_KEY = process.env.SECRET_KEY;
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
          if (
            req.body.currentPassword === undefined &&
            req.body.newPassword === undefined
          ) {
            for (const key in req.body) {
              user[key] = req.body[key];
            }

            await user.save();

            return res.status(200).json({ message: "Datas Modified." });
          } else {
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

              const token = jwt.sign(
                { email: user.email, password: user.password },
                SECRET_KEY,
                {
                  expiresIn: "1h",
                }
              );

              return res
                .status(200)
                .json({ message: "Password Changed.", token: token });
            }

            return res
              .status(401)
              .json({ error: "Incorrect Current Password." });
          }
        } else return res.status(401).json({ error: "Invalid Token." });
      }
    }

    return res.status(401).json({ error: "Invalid Token." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Service Error" });
  }
}

module.exports = EditDatasModelRoute;
