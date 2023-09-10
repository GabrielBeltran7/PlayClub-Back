const {Router} = require("express")
const {getPostHandler, createPostHandler} = require ("../handlers/postsHandlers")
const postsRouter = Router();

postsRouter
.get("/", getPostHandler)
.post("/", createPostHandler)

    

module.exports = postsRouter;