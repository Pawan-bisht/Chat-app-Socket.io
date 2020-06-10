const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);


let publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath))

let count = 0;
io.on("connection", (socket) => { //listening to a given event to occur

    console.log("We are connected now");
    //To send an event to client we use socket.emit.
    //Event is made up of name of event and the event parameters  
    // socket.emit("countUpdated", count, "This is the second one") //first argument is name of event and second one is for the callback function

    // socket.on("increment", () => {
    //     count++;
    //     //socket.emit("countUpdated", count) //this will emit count to a single/particular client/connection

    //     io.emit("countUpdated", count); //this will emit an event to every single connection/client
    // })

    socket.emit("message", "Welcome!")
    socket.on("sendMessage", (clientMessag) => {
        console.log(clientMessag)
        io.emit("serverMessage", clientMessag);
    })
})

server.listen(PORT, () => {
    console.log("Server running at :", PORT);
})