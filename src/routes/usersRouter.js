const {Router} = require("express")
const { postUserHandler} = require("../Users/createusers")
const {loginUsers} = require("../Users/loginusers")

const usersRouter = Router();
usersRouter.post("/", postUserHandler) 
usersRouter.post("/login", loginUsers) 

module.exports = usersRouter;