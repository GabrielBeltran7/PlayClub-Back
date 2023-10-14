

const { User } = require("../db");


// Función para iniciar el proceso de actualización de perfil de usuario
async function updatePuntosUsuario(req, res) {
  const { username,cantidad } = req.body;

  try {
    // Busca al usuario por su nombre de usuario
    const cantidadnumero = parseInt(cantidad)
    const usuario = await User.findOne({ where: { username } });

    if (!usuario) {
      return res.status(404).json({  error: 'Usuario no encontrado' });
    }
if (usuario.cantidadtotal <cantidadnumero) {
  return res.status(404).json({  error: 'no puede restar mas puntos de los que el Usuario tiene...' });
}
 const restapuntos = usuario.cantidadtotal - cantidadnumero

    // Actualiza las propiedades del usuario en la base de datos
    await usuario.update({
    cantidadtotal:restapuntos
     
    });

    // Envía un correo electrónico con la nueva contraseña (si es necesario)

    return res.status(200).json({ mensaje: 'Puntos  actualizados con éxito' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mensaje: 'Debe ser un Usuario Valido' });
  }
}

module.exports = {
  updatePuntosUsuario
};