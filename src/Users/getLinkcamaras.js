const { Crearlinkcamaras } = require("../db");

const getLinkcamaras = async (req, res) => {
  try {
    // Intenta buscar todos los registros de Linkcamaras
    const linkcamaras = await Crearlinkcamaras.findOne();

    // Siempre responde con los registros encontrados o un arreglo vacío
    return res.status(200).json(linkcamaras || []);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al obtener los Linkcamaras:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getLinkcamaras
};
