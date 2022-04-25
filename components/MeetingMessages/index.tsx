import React, { FormEvent, useState } from 'react';
import styles from './MeetingMessages.module.css';

function MeetingMessages({ messages, setMessages, handleSubmit }: any) {
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
