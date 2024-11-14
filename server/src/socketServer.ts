import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket } from 'socket.io';

let io: Server | null = null;

const handleConnection = (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User  disconnected:', socket.id);
  });

  socket.on('joinRoom', (room: string) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  socket.on('leaveRoom', (room: string) => {
    socket.leave(room);
    console.log(`${socket.id} left room: ${room}`);
  });

  socket.on('sendMessage', (data: { room: string; message: string }) => {
    const { room, message } = data;
    socket.to(room).emit('receiveMessage', {
      message,
      sender: socket.id,
    });
  });

  socket.on('startGame', (gameData: any) => {
    socket.emit('gameStarted', gameData);
  });

  socket.on('updateScore', (scoreData: any) => {
    socket.emit('scoreUpdated', scoreData);
  });

  socket.on('attack', (attackData: { targetRoom: string; damage: number }) => {
    socket.to(attackData.targetRoom).emit('attackNotification', {
      attacker: socket.id,
      damage: attackData.damage,
    });
  });

  socket.on('defend', (defendData: { targetRoom: string; defense: number }) => {
    socket.to(defendData.targetRoom).emit('defendNotification', {
      defender: socket.id,
      defense: defendData.defense,
    });
  });

  socket.on('heartbeat', () => {
    socket.emit('heartbeatResponse');
  });
};

export function initializeSocketServer(httpServer: HTTPServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', handleConnection);

  return io;
}

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }
  return io;
};