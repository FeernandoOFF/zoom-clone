import React from 'react';
import styles from './NameInput.module.css';

type Props = {
  setName?: any;
};

function NameInput({ setName }: Props) {
  const handleName = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    localStorage.setItem('name', name);
    if (setName) setName(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Please Insert your name</p>
        <form onSubmit={handleName}>
          <input type="text" />
          <button type="submit">Okay</button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;
