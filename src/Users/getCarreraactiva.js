const { Crearcarrera, Crearcorredor} = require("../db");

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

const getCarrerarycorredores = async (req, res) => {
  const { nombrecarrera } = req.params;

  try {
    // Intenta buscar la carrera por nombre de carrera y cargar los corredores asociados
    const carrera = await Crearcarrera.findOne({
      where: {
        nombrecarrera: nombrecarrera,
      },
      include: {
        model: Crearcorredor, // Nombre del modelo relacionado
        attributes: ["id", "nombre", "numero", "imagen1"] // Atributos del modelo relacionado a recuperar
      }
    });

    // Verifica si se encontró la carrera
    if (!carrera) {
      return res.status(404).json({ error: "Carrera no encontrada." });
    }

    // Si se encontró la carrera, devuelve los datos
    return res.status(200).json(carrera);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar carrera por nombre de carrera:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getCarrerarycorredores,
  getCarreraActiva
};
