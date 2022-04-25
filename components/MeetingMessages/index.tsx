import React from 'react';
import styles from './MeetingMessages.module.css';

type Props = {};

function MeetingMessages({}: Props) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messages}>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>peerro</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>Hi</p>
        <p>peerro</p>
        <p>peerro</p>
        <p>peerro</p>
      </div>
      <div className="input">
        <form className={styles.formulary}>
          <input type="text" placeholder="Join the conversation" />
        </form>
      </div>
    </div>
  );
}

export default MeetingMessages;
