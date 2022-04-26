import React, { FormEvent, useState } from 'react';
import { IMessage } from '../../utils/types/MessageType';
import styles from './MeetingMessages.module.css';

function MeetingMessages({
  messages,
  setMessages,
  handleSubmit,
  userName,
}: any) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messages}>
        {messages.map((m: IMessage, i: any) => (
          <div
            key={m.uuid}
            className={`${styles.basicMessage} ${
              userName == m.user ? styles.ownMessage : styles.message
            }`}
          >
            <h5 style={{ color: '#FE9161' }}>{m.user} </h5>
            <p>{m.message}</p>
          </div>
        ))}
      </div>
      <div className="input">
        <form className={styles.formulary} onSubmit={handleSubmit}>
          <input autoFocus type="text" placeholder="Join the conversation" />
        </form>
      </div>
    </div>
  );
}

export default MeetingMessages;
