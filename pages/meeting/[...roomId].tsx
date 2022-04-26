import styles from './Meeting.module.css';
import VideoComponent from '../../components/VideoComponent';
import { peerConfig } from '../../utils/types/config';
import { IMessage } from '../../utils/types/MessageType';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import UserList from '../../components/UserList';
import MeetingMessages from '../../components/MeetingMessages';
import VerifyName from '../../components/VerifyName';
import NameInput from '../../components/NameInput';
import { useName } from '../../utils/types/useName';

function MeetingRoom() {
  // * Sockets and Peers
  const [socket, setSocket] = useState<any>(null);
  const [peer, setPeer] = useState<any>(null);

  // * App Variables

  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [userName, setUserName] = useName();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [usersInCall, setUsersInCall] = useState<string[]>([]);

  // * ROOM ID
  const {
    query: { roomId },
  } = useRouter();

  // * Socket connection Promise
  const socketInitializer = async () => {
    await fetch(`/api`);
    setSocket(io());
  };

  const handleMessageSubmit = (e: any) => {
    e.preventDefault();

    const newMessage: IMessage = {
      user: userName,
      message: e.target[0].value,
      uuid: uuidv4(),
    };
    console.log(newMessage);
    setMessages([...messages, newMessage]);

    socket.emit('message', newMessage);

    e.target[0].value = '';
  };

  useEffect((): any => {
    if (!useName) return;
    socketInitializer().then(() => {
      // * If not have acces to camera, the app does not crash
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            // * The first stream is OURS
            setStreams([currentStream]);

            import('peerjs').then(({ default: Peer }) => {
              const myPeer = new Peer(undefined, peerConfig);
              // * Set the Peer to Global Scope
              setPeer(myPeer);
            });
          });
      }
      // ! TODO: Error handler for CAMERA not Avialable
    });
  }, [userName]);

  useEffect(() => {
    if (!socket?.on) return;
    if (!peer?.on) return;
    if (!setStreams) return;

    //  * After peer connected Emit an event in a room
    peer.on('open', (myId: string) => {
      console.log('Conectado a Peer y con id ' + myId);
      // * Trying to Join a Room wich triggers the event user-join

      setUsersInCall([userName]); // Add us to the call Array
      socket.emit('join-room', { roomId, id: myId, userName });

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

    // TODO: Show a success Message

    socket.on('connect', () => {
      console.log('connected! :3');
    });

    // * New Message , Add to message List
    socket.on('message', (msg: IMessage) => {
      setMessages([...messages, msg]);
    });

    // * User join room and Call him
    socket.on(
      'user-connected',
      ({
        id: userId,
        userName: newUserName,
      }: {
        id: string;
        userName: string;
      }) => {
        // TODO: Add to User List
        console.log('user connected', userId, newUserName);
        setUsersInCall([...usersInCall, newUserName]);
        //  * Try to call the user
        callUser(userId, streams[0]);
      }
    );

    // * Call And Add the stream to The array (FUNCTION)
    const callUser = (userId: string, stream: MediaStream) => {
      const userCall = peer.call(userId, streams[0]);
      userCall.on('stream', (userVideo: MediaStream) => {
        addVideo(userVideo);
      });
    };

    // * Abstraction if need More info at the time of adding a Video (FUNCTION)
    const addVideo = (stream: MediaStream) => {
      setStreams([...streams, stream]);
    };
  }, [
    socket,
    peer,
    streams,
    setStreams,
    roomId,
    messages,
    setMessages,
    usersInCall,
    setUsersInCall,
  ]);

  // * ASK FOR NAME BEFORE SHOWING INTERFACE

  if (!userName) return <NameInput setName={setUserName} />;
  return (
    <div className={styles.meetingContainer}>
      <div className={styles.videoGrid}>
        {streams?.map((s, i) => (
          <VideoComponent stream={s} key={i} muted={i === 0} />
        ))}
      </div>
      <div className={styles.messageContainer}>
        <UserList users={usersInCall} />
        <MeetingMessages
          messages={messages}
          userName={userName}
          setMessages={setMessages}
          handleSubmit={handleMessageSubmit}
        />
      </div>
    </div>
  );
}

export default MeetingRoom;

function Meeting() {
  return <div>Hi</div>;
}
