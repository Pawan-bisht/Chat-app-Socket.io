const socket = io();

socket.on("countUpdated", (count, str) => {
    console.log("Count has been updated", count, str);
})

socket.on("message", (message) => {
    console.log(message);
})

//Accepts the two argument first is the name of event 
//and the callback function to run fro that event

document.querySelector("#increment").addEventListener("click", () => {
    console.log("Clicked button");
    socket.emit("increment", "Message from client");
    socket.emit("clientMessage", "Message from  client 2");
})

let inputMsg = document.getElementById("send-message");
let form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("sendMessage", inputMsg.value);

})

socket.on("serverMessage", (serverMsg) => {
    console.log(serverMsg);
    let para = document.querySelector("#all-message")
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(serverMsg);
    node.appendChild(textnode);
    para.appendChild(node);
    inputMsg.value = ""

})