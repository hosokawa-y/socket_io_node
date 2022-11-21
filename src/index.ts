import * as socketio from 'socket.io';
import * as http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

//socket.ioの新しいインスタンスを初期化
const io = new socketio.Server(server); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//受信ソケットの接続イベントをリッスンする
io.on("connection", (socket) => {
    console.log("socket id: " + socket.id);
    console.log("a user connected");
    // chat messageイベントを受信
    socket.on("chat message", (msg: string) => {
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