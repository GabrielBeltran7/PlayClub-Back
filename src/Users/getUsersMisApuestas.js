// const { PuntosapostadosWin, PuntosapostadosExacta, PuntosapostadosTrifecta, PuntosapostadosSuperfecta } = require("../db");

// const getAllmisApuestas = async (req, res) => {
//   try {
//     const username = req.params; // Supongo que obtienes el username desde la solicitud

//     // Realiza todas las consultas de manera concurrente para mejorar el rendimiento
//     const [win, exacta, trifecta, superfecta] = await Promise.all([
//       PuntosapostadosWin.findAll({
//         where: { username: username }, // Agrega la condición donde username sea igual al valor deseado
//       }),
//       PuntosapostadosExacta.findAll({
//         where: { username: username },
//       }),
//       PuntosapostadosTrifecta.findAll({
//         where: { username: username },
//       }),
//       PuntosapostadosSuperfecta.findAll({
//         where: { username: username },
//       }),
//     ]);

//     const allApuestas = {
//       win,
//       exacta,
//       trifecta,
//       superfecta,
//     };

//     // Envía una respuesta JSON exitosa con los datos recopilados
//     res.status(200).json(allApuestas);
//   } catch (error) {
//     // Manejo de errores: Envía una respuesta JSON con el error si ocurre uno
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getAllmisApuestas,
// };




const { PuntosapostadosWin } = require("../db");

const getAllmisApuestas = async (req, res) => {
  const { username } = req.params;

  try {
    // Intenta buscar el usuario por username
    const user = await PuntosapostadosWin.findOne({
      where: {
        username: username
      }
    });

    // Verifica si se encontró el usuario
    if (!user) {
      return res.status(404).json({ error: "Apuesta no encontradao." });
    }

    // Si se encontró el usuario, devuelve los datos
    return res.status(200).json(user);
  } catch (error) {
    // Manejo de errores con mensaje descriptivo
    console.error("Error al buscar usuario por username:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = {
  getAllmisApuestas
};

