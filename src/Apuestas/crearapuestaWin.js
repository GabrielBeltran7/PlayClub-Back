
// const { PuntosapostadosWin, User } = require("../db");

// const postapuestaWin = async (req, res) => {
//   const { id, puntosganadoswin, puntosapostadoswin, nombreapuesta, corredor, usermane } = req.body;
  
//   try {
//     // Buscar el registro de usuario correspondiente al ID proporcionado
//     const usuario = await User.findOne({
//       where: { id: id }
//     });

//     if (!usuario) {
//       return res.status(404).json({ error: "No se encontró el usuario con el ID proporcionado." });
//     }

//     // Restar los puntos apostados de cantidadtotal en el usuario
//     usuario.cantidadtotal -= puntosapostadoswin;
    
//     // Guardar los cambios en la base de datos
//     await usuario.save();

//     // Crear el registro de PuntosapostadosWin
//     const win = await PuntosapostadosWin.create({
//       nombreapuesta,
//       corredor,
//       usermane,
//       puntosganadoswin,
//       puntosapostadoswin,
//     });

//     return res.status(200).json(win);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   postapuestaWin,
// };





const { PuntosapostadosWin, User } = require("../db");

const postapuestaWin = async (req, res) => {
  const { id, puntosganadoswin, puntosapostadoswin, nombreapuesta, corredor, usermane } = req.body;
  
  try {
    // Buscar el registro de usuario correspondiente al ID proporcionado
    const usuario = await User.findOne({
      where: { id: id }
    });

    if (!usuario) {
      return res.status(404).json({ error: "No se encontró el usuario con el ID proporcionado." });
    }

    // Restar los puntos apostados de cantidadtotal en el usuario
    if(usuario.cantidadtotal < puntosapostadoswin){
      return res.status(404).json({ error: "No tiene Puntos Suficientes para a la apuesta" });
    }else{
      usuario.cantidadtotal -= puntosapostadoswin;
    }
    
    // Guardar los cambios en la base de datos
    await usuario.save();

    // Crear el registro de PuntosapostadosWin
    const win = await PuntosapostadosWin.create({
      nombreapuesta,
      corredor,
      usermane,
      puntosganadoswin,
      puntosapostadoswin,
    });

    return res.status(200).json(win);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postapuestaWin,
};
