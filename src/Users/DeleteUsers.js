const { User } = require("../db");

const deleteUser = async (req, res) => { 
  const { username } = req.params;

  
  try {
    const user = await User.destroy({ where: { username } });
   
    if (user) {
      // El usuario se eliminó correctamente
      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      // No se encontró un usuario con el ID proporcionado
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    // Error interno del servidor
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

module.exports = {
  deleteUser
};
