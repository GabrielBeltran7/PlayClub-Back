const { User } = require("../db");
const bcrypt = require("bcrypt");

const ActualizarPaswordUsuario = async (req, res) => {
  const { username, contraseñaActual, nuevaContraseña } = req.body;

  try {
    // Buscar al usuario por su ID
    const usuario = await User.findOne({ where: { username } });
    

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Verificar si la contraseña actual es correcta
    const contraseñaValida = await bcrypt.compare(contraseñaActual, usuario.password);

    if (!contraseñaValida) {
      return res.status(400).json({ error: "La contraseña actual es incorrecta." });
    }

    // Generar un hash de la nueva contraseña
    const nuevoHashContraseña = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar la contraseña en la base de datos
    usuario.password = nuevoHashContraseña;
    await usuario.save();

    return res.status(200).json({ mensaje: "Contraseña actualizada con éxito." });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  ActualizarPaswordUsuario
};
