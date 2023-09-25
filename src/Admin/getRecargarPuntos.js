const { Recargarpuntos, User } = require("../db");
const getRecargarPuntos = async (req, res) => {
 

  try {
    // Intenta buscar la carrera por nombre de carrera y cargar los corredores asociados
    const recargarPuntos = await Recargarpuntos.findAll({
      
      include: {
        model: User, // Nombre del modelo relacionado
        attributes: [ "username", "cantidadtotal"] // Atributos del modelo relacionado a recuperar
      }
    });

    // Verifica si se encontró la carrera
    if (!recargarPuntos) {
      return res.status(404).json({ error: "No ahi datos." });
    }

    // Si se encontró la carrera, devuelve los datos
    return res.status(200).json(recargarPuntos);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar puntos recargados:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getRecargarPuntos
};
