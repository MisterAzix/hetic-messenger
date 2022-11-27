import css from './UserList.module.scss';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Avatar, Card, CardHeader } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';

export default function UserList() {
  const users = useGetUsers();

  const { messages } = useSelector((state: AppState) => ({
    messages: state.messages,
  }));

  if (!users) return <div>Loading users...</div>;

  return (
    <div className={css.list}>
      {users.map((user) => {
        const subheader =
          messages.filter((message) => message.to.id === user.id)[0]?.content || 'No message...';

        return (
          <NavLink key={user.id} to={`/room/${user.id}`}>
            <Card className={css.card}>
              <CardHeader
                avatar={
                  <Avatar sx={{ background: 'darkgray' }} aria-label="recipe">
                    {user.username.split('')[0].toUpperCase()}
                  </Avatar>
                }
                title={user.username}
                subheader={subheader}
              ></CardHeader>
            </Card>
          </NavLink>
        );
      })}
    </div>
  );
}
