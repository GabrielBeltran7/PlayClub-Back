const { Crearcarrera } = require("../db");

const getCarreraActiva = async (req, res) => {
  const { nombrecarrera } = req.params;

  try {
    // Intenta buscar el usuario por username
    const carrera = await Crearcarrera.findOne({
      where: {
        nombrecarrera: nombrecarrera
      }
    });

    // Verifica si se encontró el usuario
    if (!carrera) {
      return res.status(404).json({ error: "Carrera no encontrado." });
    }

    // Si se encontró el usuario, devuelve los datos
    return res.status(200).json(carrera);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar carrera por nombre de carrera:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = {
  getCarreraActiva
};
