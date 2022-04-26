import type { NextPage } from 'next';

import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Zoom KK</h1>

      <Link href={`/meeting/${uuidv4()}`}>
        <button>Launch Meet </button>
      </Link>
    </div>
  );
};

export default Home;
