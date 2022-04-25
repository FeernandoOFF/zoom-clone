import { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext();
const socket = io('/api');

const contextProvider = ({ children }: any) => {
  const [stream, setStream] = useState<any>(null);
  const [setMe, setMe] = useState<any>(null);

  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    socket.on('me', setMe);
    socket.on('calluser', ({ from, name, signal }) => {
      console.log('call Recived');
    });
  }, []);

  const answerCall = () => {
    return false;
  };
  const callUser = () => {
    return false;
  };

  const leaveCall = () => {
    return false;
  };
};
