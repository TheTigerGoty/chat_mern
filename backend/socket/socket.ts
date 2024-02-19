import express, { Application } from "express";
import { Server, Socket } from "socket.io";
import http from 'http'

//!----------------------------------------------------------------------------------------!//

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})

export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId]
}


const userSocketMap: { [userId: string]: string } = {};

io.on('connection', (socket: Socket) => {
    console.log('a user connected', socket.id)

    const userId: string = socket.handshake.query.userId as string
    if (userId != 'undefined') {userSocketMap[userId] = socket.id;
}

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnect', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

//!----------------------------------------------------------------------------------------!//

export { app, io, server }