'use client';

import css from './UserList.module.scss';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Avatar, Card, CardHeader } from '@mui/material';
import Link from 'next/link';

export default function UserList() {
  const users = useGetUsers();

  if (!users) return <div>Loading users...</div>;

  return (
    <div className={css.list}>
      {users.map((user) => (
        <Link key={user.id} href={`/room/${user.id}`}>
          <Card className={css.card}>
            <CardHeader
              avatar={
                <Avatar sx={{ background: 'darkgray' }} aria-label="recipe">
                  {user.username.split('')[0].toUpperCase()}
                </Avatar>
              }
              title={user.username}
            ></CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
