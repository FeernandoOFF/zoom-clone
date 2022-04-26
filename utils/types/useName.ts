import { useEffect, useState } from 'react';

export function useName() {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) setName(storedName);
  }, []);

  if (!name) {
    return [false, setName];
  }
  return [name, setName];
}
