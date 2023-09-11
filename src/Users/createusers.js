const { User, Post } = require("../db");

const bcrypt = require("bcrypt");

const postUserHandler = async (req, res) => {
  const { username, email, password, imagen } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuarioexiste = await User.count({ where: { username } });
    if (usuarioexiste > 0)
      return res.status(400).json({ error: "Usuario ya existe" });
    const correoexiste = await User.count({ where: { email } });
    if (correoexiste > 0)
      return res.status(400).json({ error: "Correo  ya existe" });
      const newUser = await User.create({ 
         username,
         email, 
         password:hashedPassword, 
         imagen });
      
      return res.status(200).json( newUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  postUserHandler,
}
