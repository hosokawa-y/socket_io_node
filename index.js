const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

//socket.ioの新しいインスタンスを初期化
const io = new Server(server); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//受信ソケットの接続イベントをリッスンする
io.on("connection", (socket) => {
    console.log("a user connected");
    // chat messageイベント
    socket.on("chat message", (msg) => {
        // 送信者を含む全員にメッセージを送信する
        io.emit("chat message", msg);
    });
    //ソケットの切断イベントを設定
    socket.on("disconnect", () => {
        console.log("user disconnected")
    });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});