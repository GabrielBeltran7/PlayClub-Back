const { PuntosapostadosWin, PuntosapostadosExacta, PuntosapostadosTrifecta, PuntosapostadosSuperfecta } = require("../db");

const getAllApuestas = async (req, res) => {
  try {
    // Realiza todas las consultas de manera concurrente para mejorar el rendimiento
    const [win, exacta, trifecta, superfecta] = await Promise.all([
      PuntosapostadosWin.findAll(),
      PuntosapostadosExacta.findAll(),
      PuntosapostadosTrifecta.findAll(),
      PuntosapostadosSuperfecta.findAll(),
    ]);

    const allApuestas = {
      win,
      exacta,
      trifecta,
      superfecta,
    };

    // Envía una respuesta JSON exitosa con los datos recopilados
    res.status(200).json(allApuestas);
  } catch (error) {
    // Manejo de errores: Envía una respuesta JSON con el error si ocurre uno
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllApuestas,
};
