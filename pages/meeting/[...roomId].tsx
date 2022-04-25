import styles from './Meeting.module.css';
import VideoComponent from '../../components/VideoComponent';
import { peerConfig } from '../../utils/types/config';

import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import UserList from '../../components/UserList';
import MeetingMessages from '../../components/MeetingMessages';

function Meeting() {
  const [socket, setSocket] = useState<any>(null);
  const [peer, setPeer] = useState<any>(null);

  const [messages, setMessages] = useState<string[]>([]);

  const [streams, setStreams] = useState<MediaStream[]>([]);
  // const videoRef = useRef(null);

  const {
    query: { roomId },
  } = useRouter();

  const socketInitializer = async () => {
    await fetch(`/api`);
    setSocket(io());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessages([...messages, e.target[0].value]);
    socket.emit('message', e.target[0].value);
    e.target[0].value = '';
  };

  useEffect((): any => {
    socketInitializer().then(() => {
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            // videoRef.current.srcObject = currentStream;
            setStreams([currentStream]);

            import('peerjs').then(({ default: Peer }) => {
              const myPeer = new Peer(undefined, peerConfig);
              setPeer(myPeer);
            });
          });
      } else {
        setError(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!socket?.on) return;
    if (!peer?.on) return;
    if (!setStreams) return;

    //  * After peer connected Emit an event in a room
    peer.on('open', (myId: string) => {
      console.log('Conectado a Peer y con id ' + myId);
      socket.emit('join-room', { roomId, id: myId });

      // * ANSWER CALL

      peer.on('call', (call: any) => {
        console.log('Llamada recibida');
        call.answer(streams[0]);
        call.on('stream', (userStream: MediaStream) => {
          console.log('Stream Recibido');
          addVideo(userStream);
        });
      });
    });

    socket.on('connect', () => {
      console.log('connected! :3');
    });

    socket.on('message', (msg: string) => {
      setMessages([...messages, msg]);
    });
    // * User join room and Call him

    socket.on('user-connected', (userId: any) => {
      console.log('user connected', userId);
      //  * Try to call the user
      callUser(userId, streams[0]);
    });

    // * Call And Add the stream to The array

    const callUser = (userId: string, stream: MediaStream) => {
      console.log('Trying to call: ', userId, ' ', stream);
      const userCall = peer.call(userId, streams[0]);
      userCall.on('stream', (userVideo: MediaStream) => {
        addVideo(userVideo);
      });
    };

    const addVideo = (stream: MediaStream) => {
      setStreams([...streams, stream]);
    };
  }, [socket, peer, streams, setStreams, roomId]);

  return (
    <div className={styles.meetingContainer}>
      <div className={styles.videoGrid}>
        {streams?.map((s, i) => (
          <VideoComponent stream={s} key={i} muted={i === 0} />
        ))}
      </div>
      <div className={styles.messageContainer}>
        <UserList />
        <MeetingMessages
          messages={messages}
          setMessages={setMessages}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Meeting;
