import { NextApiRequest, NextApiResponse } from 'next';

import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    // Initialize Socket
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // Configure the socket behavior

    io.on('connection', (socket) => {
      console.log('New connection');

      socket.on('join-room', ({ roomId, id, userName }) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', { id, userName });
        socket.on('message', (msg) => {
          socket.broadcast.to(roomId).emit('message', msg);
        });
        // socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => {
          socket.broadcast.to(roomId).emit('user-disconnected', id);
          // socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
      });
    });
  }
  res.end();
};
export default SocketHandler;
