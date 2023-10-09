
const { User, Recargarpuntos } = require("../db");

const agregarPuntosAUsuarios = async (req, res) => {
  let { cantidad, username } = req.body; // Mantén cantidad como string inicialmente
  const subadminUsername = username;
  
    try {
    cantidad = parseInt(cantidad, 10); // Convierte cantidad en un número entero

    // Validar que la cantidad sea un número positivo


    if(subadminUsername === "SubAdmin"){
      
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: "La cantidad debe ser un número positivo." });
    }

    // Consulta todos los usuarios que no son subadmin ni subadmin
    const usuarios = await User.findAll({
      where: {
        subadmin: false,
        admin: false,
      },
    });

    // Verificar si hay usuarios para agregar puntos
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ error: "No hay usuarios elegibles para agregar puntos." });
    }

    // Consulta al Usuario SubAdmin por nombre de usuario
    const subadmin = await User.findOne({ where: { username: subadminUsername, subadmin: true } });

    // Verificar si el Usuario SubAdmin existe
    if (!subadmin) {
      return res.status(404).json({ error: `El Usuario SubAdmin ${subadminUsername} no está autorizado para dar Bonos.` });
    }

    // Verificar si el Usuario SubAdmin tiene suficientes puntos
    if (subadmin.cantidadtotal < cantidad * usuarios.length) {
      return res.status(400).json({ error:  `El Usuario ${subadminUsername} no tiene suficientes puntos para realizar esta operación.` });
    }

    // Restar la cantidad total de puntos al Usuario SubAdmin
    const nuevaCantidadTotalSubadmin = subadmin.cantidadtotal - cantidad * usuarios.length;
    await subadmin.update({ cantidadtotal: nuevaCantidadTotalSubadmin });

    // Agregar la cantidad deseada de puntos a cada usuario
    for (const usuario of usuarios) {
      // Calcular la nueva cantidad total de puntos para el usuario
      const nuevaCantidadTotalUsuario = usuario.cantidadtotal + cantidad;

      // Actualizar la cantidadtotal del usuario
      await usuario.update({ cantidadtotal: nuevaCantidadTotalUsuario });

      // Registrar la transacción de recarga de puntos en la tabla de registros
      await Recargarpuntos.create({
        cantidad,
        usernameAdmin: `Bonos de ${subadminUsername} `,
        UserId: usuario.id,
        // Otros campos relacionados con la transacción
      });
    }

    return res.status(200).json({ message: `Se agregaron ${cantidad} puntos a ${usuarios.length} usuarios.` });
  }else return res.status(400).json({ error: `No eres usuario autorizado para dar bonos..` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  agregarPuntosAUsuarios,
};

