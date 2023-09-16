const { User } = require("../db");

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    // Intenta buscar el usuario por username
    const user = await User.findOne({
      where: {
        username: username
      }
    });

    // Verifica si se encontró el usuario
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Si se encontró el usuario, devuelve los datos
    return res.status(200).json(user);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar usuario por username:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = {
  getUserByUsername
};
