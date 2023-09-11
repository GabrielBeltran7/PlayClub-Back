const {Router} = require("express")
const usersRouter = require("./usersRouter")
const mainRouter= Router();
mainRouter.use("/users", usersRouter)


module.exports = mainRouter