import { useEffect, useRef } from 'react';
import styles from './Video.module.css';

interface IVideo {
  stream: MediaStream;
  muted: boolean;
}

export default function VideoComponent({ stream, muted }: IVideo) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (!stream && videoRef.current) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      className={styles.video}
      muted={muted}
      autoPlay
      ref={videoRef}
    ></video>
  );
}
