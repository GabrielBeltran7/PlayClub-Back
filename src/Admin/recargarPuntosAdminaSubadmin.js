const { Recargarpuntos, User } = require("../db");

const postPuntosAdminaSubadmin = async (req, res) => {
  const { cantidad, precio, UserId, username, id } = req.body; // Cambio de subadmin a admin
  const usernameAdmin = username;

  try {
    // Convierte la cantidad a un número entero
    const cantidadEntera = parseInt(cantidad, 10);

    if (isNaN(cantidadEntera)) {
      return res.status(400).json({ error: "La cantidad no es un número válido." });
    }
    if (username === "Admin") {
      // Busca al usuario administrador por su clave primaria (ID)
      const usuarioAdmin = await User.findByPk(id); // Cambio de subadmin a admin

      // Verifica si el usuario administrador existe y si tiene suficientes puntos para la recarga
      if (!usuarioAdmin) {
        return res.status(404).json({ error: "El usuario administrador no existe." });
      }

      if (usuarioAdmin.cantidadtotal < cantidadEntera) {
        return res.status(400).json({ error: "El usuario administrador no tiene suficientes puntos para recargar." });
      }

      // Resta la cantidad al usuario administrador
      const nuevaCantidadTotalAdmin = usuarioAdmin.cantidadtotal - cantidadEntera;
      await usuarioAdmin.update({ cantidadtotal: nuevaCantidadTotalAdmin });

      // Busca al usuario por su ID
      const usuario = await User.findByPk(UserId);

      // Suma la cantidad al usuario
      const nuevaCantidadTotalUsuario = usuario.cantidadtotal + cantidadEntera;
      await usuario.update({ cantidadtotal: nuevaCantidadTotalUsuario });

      // Crea un nuevo registro en Recargarpuntos
      const nuevoRegistro = await Recargarpuntos.create({
        cantidad: cantidadEntera, // Usar cantidadEntera en lugar de cantidad
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
      return res.status(400).json({ error: "No eres administrador autorizado para cargar Puntos." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postPuntosAdminaSubadmin
};
