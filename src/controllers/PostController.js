
const {Post} = require("../db")

// CON ESTA FUNCION VAMOS A  CREAR EL POSTS
const createPostDb = async ( title, body, userId) =>{
const newPost = await Post.create ({ title, body}) 
await newPost.setUser(userId)
return newPost

}
// CON ESTA FUNCION VAMOS A TRAER LOS POST DE CADA USER
const getPosts = async () =>{
    const post = await Post.findAll()
    if(post.length){
        return post
    }
   throw new Error ("No se encontro Ningun Post")
}
// CON ESTA FUNCION VAMOS A ELIMI
module.exports ={
    createPostDb,
    getPosts
}
