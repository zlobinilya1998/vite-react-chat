const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const messages = [
    {author: 'Илья',date: new Date(),message: 'Тест'},
    {author: 'Дмитрий',date: new Date(),message: 'Тест'},
    {author: 'Василий',date: new Date(),message: 'Тест'},
    {author: 'Иван',date: new Date(),message: 'Тест'},
    {author: 'Илья',date: new Date(),message: 'Тест'},
    {author: 'Илья',date: new Date(),message: 'Тест'},
];

webSocketServer.on('connection', ws => {
    ws.on('message', m => {
        const message = JSON.parse(m);
        console.log('New message', message)
        messages.push({...message,date: new Date()});
        webSocketServer.clients.forEach(client => client.send(JSON.stringify(messages)));
    });

    ws.on("error", e => ws.send(e));

    ws.send(JSON.stringify(messages));
});

server.listen(3000, () => console.log("Server started"))
