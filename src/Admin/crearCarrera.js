const { Crearcarrera } = require("../db");
const postCarrera = async (req, res) => {
  const { nombrecarrera, porcentajeWin, porcentajeExacta, porcentajeTrifecta, porcentajeSuperfecta, username } = req.body;
  const usernameAdmin = username;
  try {
    const carrera = await Crearcarrera.create({
      usernameAdmin,
      nombrecarrera,
      porcentajeWin,
      porcentajeExacta,
      porcentajeTrifecta,
      porcentajeSuperfecta,
    });
    return res.status(200).json(carrera);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postCarrera,
};
