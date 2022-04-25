import React, { FormEvent, useState } from 'react';
import styles from './MeetingMessages.module.css';

function MeetingMessages({}) {
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessages([...messages, e.target[0].value]);
    e.target[0].value = '';
  };
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
      <div className="input">
        <form className={styles.formulary} onSubmit={handleSubmit}>
          <input type="text" placeholder="Join the conversation" />
        </form>
      </div>
    </div>
  );
}

export default MeetingMessages;
