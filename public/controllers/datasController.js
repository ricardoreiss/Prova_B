const User = require("../models/userMOdel");
const jwt = require("jsonwebtoken");

async function DatasModelRoute(req, res) {
  const token = req.query.token;

  try {
    const decodedToken = jwt.decode(token);

    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      const email = decodedToken.email;
      const password = decodedToken.password;

      const user = await User.findOne({ where: { email } });

      if (user && user.password === password) {
        const userDatas = {
            email: user.email,
            name: user.name,
            surname: user.surname,
            telephone: user.telephone,
            gender: user.gender
        }

        return res.status(200).json(userDatas);
      } 
    } 
    
    return res.status(401).json({ error: "Invalid Token." });
  } catch (error) {
    console.error(error);
    throw res.status(500).json({ error: "Intern Sevice Error" });
  }
}

module.exports = DatasModelRoute;
