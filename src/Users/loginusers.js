const { User } = require("../db");
const bcrypt = require("bcrypt");

const loginUsers = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    let user;
    // Verificar si el inicio de sesión se realiza con correo electrónico o nombre de usuario
    if (email) {
      user = await User.findOne({ where: { email: email } });
    } else if (username) {
      user = await User.findOne({ where: { username: username } });
    } else {
      return res
        .status(400)
        .send(
          "Debes proporcionar un correo electrónico o un nombre de usuario."
        );
    }

    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }

    // Verificar la contraseña utilizando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Contraseña incorrecta");
    }

    // Devolver el usuario sin la contraseña
    const userWithoutPassword = { ...user.dataValues, password: "" };
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  loginUsers,
};
