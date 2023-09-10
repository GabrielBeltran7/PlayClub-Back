const {Router} = require("express")
const { postUserHandler,} = require("../handlers/usersHandlers")

const usersRouter = Router();
usersRouter.post("/", postUserHandler)   /// guarda los usuarios por body


module.exports = usersRouter;