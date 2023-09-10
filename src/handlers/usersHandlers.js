const {User, Post } = require("../db");
const {createUserDb} = require ("../controllers/UserController")
const postUserHandler = async(req, res)=>{
  const   {username, email, password, imagen} = req.body;
try {
  const usuarioexiste = await User.count({where:{username}})
if(usuarioexiste>0) return res.status(400).json({error:"Usuario ya existe"})
 const correoexiste = await User.count({where:{email}})
 if(correoexiste>0) return res.status(400).json({error:"Correo  ya existe"})
  const  response = await createUserDb (username, email, password, imagen)
  res.status(200).json(response)
} 
catch (error) {
  res.status(400).json({error:  error.message}); 
}
}

module.exports ={
   
    postUserHandler,
}