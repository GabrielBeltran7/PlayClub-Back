const {Router} = require("express")
const {postapuestaWin} = require("../Apuestas/crearapuestaWin")
const {postapuestaExacta} = require ("../Apuestas/crearapuestaExacta")

const usersRouter = Router();
usersRouter.post("/win", postapuestaWin) 
usersRouter.post("/exacta", postapuestaExacta) 
module.exports = usersRouter;