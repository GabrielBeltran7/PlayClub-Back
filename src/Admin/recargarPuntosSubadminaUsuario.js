const { Recargarpuntos, User } = require("../db");

const postPuntosSubadminaUsuario = async (req, res) => {
  const { cantidad, precio, UserId, username, id } = req.body;
  const usernameAdmin = username;

  // Convierte la cantidad a un número entero
  const cantidadEntera = parseInt(cantidad, 10);

  try {
    if (username) {
      // Busca al usuario subadministrador por su clave primaria (ID)
      const subadmin = await User.findByPk(id);

      // Verifica si el subadministrador existe y si tiene suficientes puntos para la recarga
      if (!subadmin) {
        return res.status(404).json({ error: "El subadministrador no existe." });
      }

      if (subadmin.cantidadtotal < cantidadEntera) {
        return res.status(400).json({ error: "El subadministrador no tiene suficientes puntos para recargar." });
      }

      // Resta la cantidad al subadministrador
      const nuevaCantidadTotalSubadmin = subadmin.cantidadtotal - cantidadEntera;
      await subadmin.update({ cantidadtotal: nuevaCantidadTotalSubadmin });

      // Busca al usuario por su ID
      const usuario = await User.findByPk(UserId);

      // Suma la cantidad al usuario
      const nuevaCantidadTotalUsuario = usuario.cantidadtotal + cantidadEntera;
      await usuario.update({ cantidadtotal: nuevaCantidadTotalUsuario });

      // Crea un nuevo registro en Recargarpuntos
      const nuevoRegistro = await Recargarpuntos.create({
        cantidad: cantidadEntera,
        precio,
        usernameAdmin,
        UserId
      });

      // Calcula la suma de cantidades para el usuario y actualiza 'cantidadtotal'
      const totalCantidad = await Recargarpuntos.sum("cantidad", {
        where: { UserId }
      });

      // Respuesta con el nuevo registro en Recargarpuntos
      return res.status(200).json(nuevoRegistro);
    } else {
      return res.status(400).json({ error: "No eres administrador." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postPuntosSubadminaUsuario
};

