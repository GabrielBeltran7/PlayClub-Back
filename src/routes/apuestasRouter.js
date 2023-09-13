const {Router} = require("express")
const {postapuestaWin} = require("../Apuestas/crearapuestaWin")

const usersRouter = Router();
usersRouter.post("/win", postapuestaWin) 
module.exports = usersRouter;