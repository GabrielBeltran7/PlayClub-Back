const { User } = require("../db");

const getUsers = async (req, res) => {
  const { username, email, id } = req.body;
  try {
    let users;

    if (username) {
      // Buscar usuarios por nombre de usuario
      users = await User.findAll({
        where: {
          username: username,
        },
      });
    } else if (email) {
      // Buscar usuarios por correo electrónico
      users = await User.findAll({
        where: {
          email: email,
        },
      });
    } else if (id) {
      // Buscar usuarios por correo electrónico
      users = await User.findAll({
        where: {
          id: id,
        },
      });
    } else {
      // Si no se proporciona ni username ni email, devolver todos los usuarios
      users = await User.findAll();
    }

    if (!users || users.length === 0) {
      return res.status(404).json({
        error: "No se encontraron usuarios que coincidan con la búsqueda.",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    let user;
    if (id) {
      user = await User.findOne({
        where: {
          id: id,
        },
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
