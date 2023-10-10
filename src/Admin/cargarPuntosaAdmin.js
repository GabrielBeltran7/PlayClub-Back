const { User, Recargarpuntos } = require("../db");

const cargarPuntosAlAdmin = async (req, res) => {
  const { cantidad, username } = req.body; // Obtener la cantidad y el nombre de usuario del Admin desde el cuerpo (body)

  try {
    // Verificar si el username es igual a "Admin"
    if (username !== "Admin") {
      return res.status(403).json({ error: ` ${username} No eres un Administrador autorizado. Para cargar Puntos` });
    }
    
    // Convierte la cantidad a un número entero
    const cantidadEntera = parseInt(cantidad, 10);

    // Validar que la cantidad sea un número positivo
    if (isNaN(cantidadEntera) || cantidadEntera <= 0) {
      return res.status(400).json({ error: "La cantidad debe ser un número positivo." });
    }

    // Consulta al Usuario Admin por nombre de usuario
    const admin = await User.findOne({ where: { username: username, admin: true } });

    // Verificar si el Usuario Admin existe
    if (!admin) {
      return res.status(404).json({ message: `El Usuario Administrador ${username} no existe.` });
    }

    // Agregar la cantidad deseada de puntos al Usuario Admin
    const nuevaCantidadTotalAdmin = admin.cantidadtotal + cantidadEntera;

    // Crear un nuevo registro en Recargarpuntos
    const nuevoRegistro = await Recargarpuntos.create({
      cantidad: cantidadEntera, // Guardar la cantidad en Recargarpuntos
      usernameAdmin: username,
      UserId: admin.id, // Guardar el ID del Usuario Admin en Recargarpuntos
    });

    // Actualizar la cantidadtotal del Usuario Admin
    await admin.update({ cantidadtotal: nuevaCantidadTotalAdmin });

    return res.status(200).json({ message: `Se agregaron ${cantidadEntera} puntos al Usuario Admin ${username}.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }s
};

module.exports = {
  cargarPuntosAlAdmin,
};

