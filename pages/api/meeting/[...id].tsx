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
