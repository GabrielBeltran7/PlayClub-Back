

const { User } = require("../db");
const bcrypt = require("bcrypt");

// Función para iniciar el proceso de actualización de perfil de usuario
async function actualizarPerfilUsuarios(req, res) {
  const { username, email, imagen } = req.body;

  try {
    // Busca al usuario por su nombre de usuario
    const usuario = await User.findOne({ where: { username } });

    if (!usuario) {
      return res.status(404).json({  mensaje: 'Usuario no encontrado' });
    }

    // Actualiza las propiedades del usuario en la base de datos
    await usuario.update({
      username,
      email,
      imagen,
     
    });

    // Envía un correo electrónico con la nueva contraseña (si es necesario)

    return res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mensaje: 'Debe ser un email valido' });
  }
}

module.exports = {
  actualizarPerfilUsuarios
};