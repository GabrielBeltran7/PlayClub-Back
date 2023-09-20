const { User } = require("../db");

const rolUsers = async (req, res) => {
  const { username, rol } = req.body;

  try {
    // Intenta buscar el usuario por username
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // Verifica si se encontró el usuario
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Actualiza los roles del usuario en función de 'rol'
    if (rol === "Usuario") {
      user.admin = false;
      user.subadmin = false;
    } else if (rol === "SubAdmin") {
      user.admin = false;
      user.subadmin = true;
    } else if (rol === "Admin") {
      user.admin = true;
      user.subadmin = false;
    }

    // Guarda los cambios en la base de datos
    await user.save();

    // Si se encontró el usuario, devuelve los datos actualizados
    return res.status(200).json(user);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar usuario por username:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  rolUsers,
};
