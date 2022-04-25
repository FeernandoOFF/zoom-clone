import React from 'react';
import styles from './Header.module.css';

type Props = {};

function Header({}: Props) {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <a>Discover</a>
        <a>Browse</a>
        <a>About</a>
      </nav>
      <div className={styles.avatar}></div>
    </div>
  );
}

export default Header;
