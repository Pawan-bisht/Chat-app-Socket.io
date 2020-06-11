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

var color = "green";
let inputMsg = document.getElementById("send-message");
let form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let msg = event.target.message.value;
    console.log(msg);
    //socket.emit("sendMessage", inputMsg.value);
    socket.emit("sendMessage", msg, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log("Message delivered");
    });
})

socket.on("serverMessage", (serverMsg) => {
    // console.log(serverMsg);
    let para = document.querySelector("#all-message")
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(serverMsg);
    node.appendChild(textnode);
    para.appendChild(node);
    inputMsg.value = ""

})

document.querySelector("#send-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
            socket.emit("sendLocation", {
                long: position.coords.longitude,
                lati: position.coords.latitude
            }, () => {
                console.log("Location shared!")
            });
        })
    }
})