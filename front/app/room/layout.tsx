import React, { Suspense } from 'react';
import css from './Room.module.scss';
import UserList from '../../src/components/UserList/List';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <div className={css.aside}>
        <h2 className={css.title}>User List</h2>
        <div className={css.list}>
          <Suspense fallback={<div>Loading users...</div>}>
            <UserList />
          </Suspense>
        </div>
      </div>
      <div className={css.chatContainer}>{children}</div>
    </div>
  );
}
