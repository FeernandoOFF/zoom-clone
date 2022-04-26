import React from 'react';
import styles from './UserList.module.css';

type Props = {
  users: string[];
};

function UserList({ users }: Props) {
  return (
    <div className={styles.userListContainer}>
      <div>
        {users.map((u) => (
          <div key={u} style={{ display: 'flex' }}>
            <div
              style={{
                width: 50,
                height: 50,
                background: '#C4C4C4',
                borderRadius: '100%',
                margin: '0 10px',
              }}
            ></div>
            <p>{u}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
