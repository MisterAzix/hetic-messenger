import css from './UserList.module.scss';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Avatar, Card, CardHeader } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { parseJwt } from '../../utils';

export function UserList() {
  const users = useGetUsers();

  const { jwt, messages } = useSelector((state: AppState) => ({
    jwt: state.auth,
    messages: state.messages,
  }));

  const me = String(parseJwt(jwt).mercure.payload.userid);

  if (!users) return <div>Loading users...</div>;

  return (
    <div className={css.list}>
      {users
        .filter((user) => String(user.id) !== me)
        .map((user) => {
          const subheader =
            messages.filter(
              (message) =>
                (String(message.from.id) === me && String(message.to.id) === String(user.id)) ||
                (String(message.from.id) === String(user.id) && String(message.to.id) === me),
            )[0]?.content || 'No message...';

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
