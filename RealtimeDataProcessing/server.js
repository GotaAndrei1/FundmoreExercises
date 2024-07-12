const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        const messageStr = message.toString();
        console.log(`Received message: ${messageStr}`);

        const processedMessage = messageStr.split("").reverse().join("");

        ws.send(processedMessage);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:8080");
