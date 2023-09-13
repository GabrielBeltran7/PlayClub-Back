const {Router} = require("express")
const { postCorredor} = require("../Admin/crearCorredor")
const {postPuntos} = require("../Admin/recargarPuntos")


const usersRouter = Router();
usersRouter.post("/corredor", postCorredor) 
usersRouter.post("/puntos", postPuntos) 

module.exports = usersRouter;