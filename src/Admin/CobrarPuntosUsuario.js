const { User, Puntospagados } = require("../db");

// Función para iniciar el proceso de actualización de puntos de usuario
async function updatePuntosUsuario(req, res) {
  const { username, cantidad, id } = req.body;

  try {
    // Convierte la cantidad a un número entero
    const cantidadNumero = parseInt(cantidad, 10);

    // Busca al usuario por su nombre de usuario
    const usuario = await User.findOne({ where: { username } });
 const cantidadquehabia = usuario.cantidadtotal
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (usuario.cantidadtotal < cantidadNumero ) {
      return res.status(400).json({ error: 'No puede restar más puntos de los que el Usuario tiene' });
    }
    else if ( cantidadNumero <=0 ) {
      return res.status(400).json({ error: 'No puede restan numero negativos' });
    }

    // Calcula la nueva cantidad total restando la cantidad
    const nuevaCantidadTotal = usuario.cantidadtotal - cantidadNumero;

    // Actualiza las propiedades del usuario en la base de datos
    await usuario.update({ cantidadtotal: nuevaCantidadTotal });

    // Busca al usuario subadministrador por su ID
    const userSubAdmin = await User.findByPk(id);

    if (!userSubAdmin) {
      return res.status(404).json({ error: 'Usuario subadministrador no encontrado' });
    }

    // Calcula la nueva cantidad total del usuario subadministrador
    const nuevaCantidadSubAdmin = userSubAdmin.cantidadtotal + cantidadNumero;

    // Actualiza las propiedades del usuario subadministrador en la base de datos
    await userSubAdmin.update({ cantidadtotal: nuevaCantidadSubAdmin });

    // Crea un registro de puntos pagados
    await Puntospagados.create({
      username: username,
      subadmin: userSubAdmin.username,
      cantidadquehabia: cantidadquehabia,
      cantidadpuntospagados: cantidadNumero,
      cantidadtotal: nuevaCantidadTotal,
    });

    return res.status(200).json({ mensaje: 'Puntos actualizados con éxito' });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, mensaje: 'Ha ocurrido un error en el servidor' });
  }
}

module.exports = {
  updatePuntosUsuario
};
