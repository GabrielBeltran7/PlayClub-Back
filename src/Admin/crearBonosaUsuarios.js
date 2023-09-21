const { User, Recargarpuntos } = require("../db");

const agregarPuntosAUsuarios = async (req, res) => {
  const { cantidad } = req.body;

  try {
    // Validar que la cantidad sea un número positivo
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: "La cantidad debe ser un número positivo." });
    }

    // Consulta todos los usuarios que no son subadmin ni admin
    const usuarios = await User.findAll({
      where: {
        subadmin: false,
        admin: false,
      },
    });

    // Verificar si hay usuarios para agregar puntos
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ message: "No hay usuarios elegibles para agregar puntos." });
    }

    // Agregar la cantidad deseada de puntos a cada usuario
    for (const usuario of usuarios) {
      // Calcular la nueva cantidad total de puntos para el usuario
      const nuevaCantidadTotal = usuario.cantidadtotal + cantidad;

      // Actualizar la cantidadtotal del usuario
      await usuario.update({ cantidadtotal: nuevaCantidadTotal });

      // Registrar la transacción de recarga de puntos en la tabla de registros
      await Recargarpuntos.create({
        cantidad,
        UserId: usuario.id,
        // Otros campos relacionados con la transacción
      });
    }

    return res.status(200).json({ message: `Se agregaron ${cantidad} puntos a ${usuarios.length} usuarios.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  agregarPuntosAUsuarios,
};
