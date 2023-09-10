
const {createPostDb, getPosts} = require("../controllers/PostController")

const getPostHandler = async(req, res) =>{
   
    try {
        const response = await getPosts()
        res.status(200).json(response)

    } catch (error) {
         res.status(400).json({error: error.message})
    }
}



const createPostHandler = async(req, res) =>{
    const {title, body, userId} = req.body
    try {
    const response = await createPostDb(title, body, userId)
    
       res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports ={
    getPostHandler,
    createPostHandler
}