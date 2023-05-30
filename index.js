let express = require("express")
let app = express()
let http = require("http").Server(app)
let io = require("socket.io")(http)

let clients = new Map()
 let obj = {}
io.on("connection",(socket)=>{

 console.log("user connected")

    socket.on("disconnect",()=>{
        clients.delete(socket.id)

        console.log(clients)

        console.log("user disconnected")
    })

   
      
socket.on("join",(name)=>{
    console.log(name)
    obj[name] = socket.id
    
    clients.set(socket.id,name)
    console.log(clients)
})

socket.on("message",(message)=>{

    const name = clients.get(socket.id)
    let id = obj[name]
    

    io.emit("GettingMessage",{"name":name,"msg":message,clientId:id})


   })
   
      
  
   


})







http.listen(300,function(){
    console.log("server started")
    
})