const { GanadoresCarrera } = require("../db");

const getGanadoresCarrera = async (req, res) => {
  try {
    // Intenta buscar todos los registros de Linkcamaras
    const ganadoresCarrera = await GanadoresCarrera.findOne();

    return res.status(200).json(ganadoresCarrera || []);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al obtener los ganadores", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getGanadoresCarrera,
};
