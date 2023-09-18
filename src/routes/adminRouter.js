const {Router} = require("express")
const { postCorredor} = require("../Admin/crearCorredor")
const {postPuntos} = require("../Admin/recargarPuntos")
const {postCarrera} =require("../Admin/crearCarrera")
const {getCorredor} = require("../Admin/getCorredor")
const {getCarrera} = require ("../Admin/getCarrera")
const {rolUsers} = require ("../Admin/rolUsers")


const usersRouter = Router();
usersRouter.post("/corredor", postCorredor) 
usersRouter.post("/puntos", postPuntos) 
usersRouter.post("/carrera", postCarrera) 
usersRouter.get("/corredor", getCorredor) 
usersRouter.get("/carrera", getCarrera) 
usersRouter.patch("/roluser", rolUsers) 

module.exports = usersRouter;