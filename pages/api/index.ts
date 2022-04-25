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

      socket.on('join-room', ({ roomId, id }) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', id);
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

/*

// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const id = req.query.id;

//   res.status(200).json({ name: `The meeting is ${id}` });
// }

import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('new-message', (msg) => {
        console.log('Message received');
        socket.broadcast.emit('new-message', msg);
      });

      socket.on('new-connection', (msg) => {
        socket.broadcast.emit('new-connection', 'new one');
        console.log('NEW ONE IS JOIN ');
      });
    });
  }
  res.end();
};

export default SocketHandler;


*/
