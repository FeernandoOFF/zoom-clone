import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Meeting.module.css';
type Props = {};
let socket: any;

function Meeting({}: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const {
    query: { id },
  } = useRouter();

  let handleSendMsg = () => {
    socket.emit('new-message', input);
    setInput('');
  };

  const socketInitializer = async () => {
    await fetch(`/api/meeting/${id}`);
    socket = io();

    socket.on('connect', () => {
      console.log(`connected to socket ${id}`);
      socket.emit('new-connection', 'Hello world');

      socket.on('new-message', (message: string) => {
        console.log(`message recived ${message}`);
        setMessages([...messages, message]);
      });
      socket.on('new-connection', () => {
        console.log(`Someone has join`);
      });
    });
  };

  useEffect(() => {
    if (id) {
      setTimeout(socketInitializer, 1000);
    }
  }, [id]);

  return (
    <div>
      <Link href="/">Return </Link>
      <p>Router {id} </p>
      <div>
        {messages.map((message) => (
          <p className={styles.message} key={message}>
            {message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSendMsg}>Send msg</button>
    </div>
  );
}

export default Meeting;
