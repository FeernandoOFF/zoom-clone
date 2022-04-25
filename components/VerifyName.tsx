import React, { useEffect, useState } from 'react';
import NameInput from './NameInput';

type Props = {
  children: any;
};

function VerifyName({ children }: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) setName(storedName);
  }, []);

  if (!name) {
    return <NameInput setName={setName} />;
  }

  const childrenWithName = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name });
    }
    return child;
  });

  return <div>{childrenWithName}</div>;
}

export default VerifyName;
