const { GanadoresCarrera } = require("../db");
const postGanadoresCarrera = async (req, res) => {
  const {
    username,
    nombreCarrera,
    primerPuesto,
    segundoPuesto,
    tercerPuesto,
    cuartoPuesto,
  } = req.body;
  try {
    await GanadoresCarrera.destroy({ where: {} });
    // Crea un nuevo registro con los datos proporcionados
    const crearGanadoresCarrera = await GanadoresCarrera.create({
      username,
      nombreCarrera,
      primerPuesto,
      segundoPuesto,
      tercerPuesto,
      cuartoPuesto,
    });
    return res.status(200).json(crearGanadoresCarrera);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postGanadoresCarrera,
};
