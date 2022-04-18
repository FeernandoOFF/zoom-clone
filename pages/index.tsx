import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { v4 as uuidv4 } from 'uuid';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Fer</h1>
      <Link href={`/meeting/${uuidv4()}`}>
        <button>Launch Meet </button>
      </Link>
    </div>
  );
};

export default Home;
