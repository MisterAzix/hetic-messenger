import css from './UserList.module.scss';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Avatar, Card, CardHeader } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function UserList() {
  const users = useGetUsers();

  if (!users) return <div>Loading users...</div>;

  return (
    <div className={css.list}>
      {users.map((user) => (
        <NavLink key={user.id} to={`/room/${user.id}`}>
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
        </NavLink>
      ))}
    </div>
  );
}
