const { GanadoresCarrera, Crearcarrera } = require("../db");
const postCarrerayGanadores = async (req, res) => {
  const {
    id,
    username,
    nombreCarrera,
    primerPuesto,
    segundoPuesto,
    tercerPuesto,
    cuartoPuesto,
  } = req.body;
  try {
    // Crea un nuevo registro con los datos proporcionados
    const crearGanadoresCarrera = await GanadoresCarrera.create({
      username,
      nombreCarrera,
      primerPuesto,
      segundoPuesto,
      tercerPuesto,
      cuartoPuesto,
      CrearcarreraId:id
    });
    return res.status(200).json(crearGanadoresCarrera);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postCarrerayGanadores,
};






// const { GanadoresCarrera, Crearcarrera } = require("../db");
// const postCarrerayGanadores = async (req, res) => {
//   const {
//     id,
//     username,

//     nombreCarrera,
//     primerPuesto,
//     segundoPuesto,
//     tercerPuesto,
//     cuartoPuesto,
//   } = req.body;
//   try {
   
//     // Crea un nuevo registro con los datos proporcionados
//     const crearGanadoresCarrera = await GanadoresCarrera.create({
//       username,
//       nombreCarrera,
//       primerPuesto,
//       segundoPuesto,
//       tercerPuesto,
//       cuartoPuesto,
//       CrearcarreraId:id
//     });
//     return res.status(200).json(crearGanadoresCarrera);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// module.exports = {
//   postCarrerayGanadores,
// };
