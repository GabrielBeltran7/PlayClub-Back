


const { GanadoresCarrera, Crearcarrera } = require("../db");
const getCarreraGanadores = async (req, res) => {
  const { nombrecarrera } = req.params;
  console.log("99999999999999999999999999",nombrecarrera)

  try {
    // Intenta buscar la carrera por nombre de carrera y cargar los corredores asociados
    const carrera = await Crearcarrera.findOne({
      where: {
        nombrecarrera: nombrecarrera,
        
      },
      include: {
        model: GanadoresCarrera, // Nombre del modelo relacionado
        attributes: [ "primerPuesto", "segundoPuesto","tercerPuesto","cuartoPuesto"], // Atributos del modelo relacionado a recuperar

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
  getCarreraGanadores
};
