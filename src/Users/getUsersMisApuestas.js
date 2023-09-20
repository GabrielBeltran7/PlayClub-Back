


const { PuntosapostadosWin, PuntosapostadosExacta, PuntosapostadosTrifecta, PuntosapostadosSuperfecta } = require("../db");

const getAllmisApuestas = async (req, res) => {
  const { username } = req.params;

  try {
    // Intenta buscar el usuario por username
    const win = await PuntosapostadosWin.findAll({
      where: {
        username: username
      }
    });
    const exacta = await PuntosapostadosExacta.findAll({
      where: {
        username: username
      }
    });
    const trifecta = await PuntosapostadosTrifecta.findAll({
      where: {
        username: username
      }
    });
    const superfecta = await PuntosapostadosSuperfecta.findAll({
      where: {
        username: username
      }
    });



    const combinedResults = {
      win,
      exacta,
      trifecta,
      superfecta
    };

    // Verifica si se encontró el usuario
    // if (!user) {
    //   return res.status(404).json({ error: "Apuesta no encontradao." });
    // }

    // Si se encontró el usuario, devuelve los datos
    return res.status(200).json(combinedResults);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
 
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = {
  getAllmisApuestas
};

