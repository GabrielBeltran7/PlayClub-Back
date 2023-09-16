const server = require ("./src/app")
const  {conn}= require ("./src/db")
const PORT = process.env.PORT || 3001
server.listen(PORT,  ()=>{
    conn.sync({force: true});
    console.log(`Servidors escuchando en el Puerto ${PORT}`);
})