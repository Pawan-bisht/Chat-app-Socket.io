const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const Filter = require("bad-words");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);

let publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath))

let count = 0;
//connection is the in-built function for socket whenver a new client is connected
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

    socket.emit("message", "Welcome!");
    socket.broadcast.emit("message", "A new user has joined");
    let filter = new Filter();
    socket.on("sendMessage", (clientMessage, callback) => {
        console.log(clientMessage);

        if (filter.isProfane(clientMessage)) {
            return callback("Profanity is not allowed!!!");
        }

        io.emit("serverMessage", clientMessage);
        callback();
    })

    socket.on("sendLocation", (coords, callback) => {
        socket.broadcast.emit("message", `https://google.com/maps?q=${coords.lati},${coords.long}`);
        callback();
    })

    socket.on("disconnect", () => {
        io.emit("message", "A user has left");
    })
})

server.listen(PORT, () => {
    console.log("Server running at :", PORT);
})