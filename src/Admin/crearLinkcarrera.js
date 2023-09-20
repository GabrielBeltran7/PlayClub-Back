const { Crearlinkcamaras } = require("../db");
const postLinkcamaras = async (req, res) => {
  const { camara1, camara2, camara3, camara4, camara5,
    username} = req.body;
  const usernameAdmin = username;
  try {
    const crearLinkcamaras = await Crearlinkcamaras.create({
      camara1, camara2, camara3, camara4, camara5, usernameAdmin

    });
    return res.status(200).json(crearLinkcamaras);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  postLinkcamaras,
};
