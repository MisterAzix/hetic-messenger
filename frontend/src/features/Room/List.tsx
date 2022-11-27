import css from './UserList.module.scss';
import { useGetUsers } from '../../hooks/useGetUsers';
import { Avatar, Card, CardHeader } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { parseJwt } from '../../utils';
import { IMessage, IUser } from '../../types';

export function UserList() {
  const users = useGetUsers();
  const { userId } = useParams();

  const { jwt, messages } = useSelector((state: AppState) => ({
    jwt: state.auth,
    messages: state.messages,
  }));

  const me = String(parseJwt(jwt).mercure.payload.userid);

  if (!users) return <div>Loading users...</div>;

  const getRoomLastMessage = (user: IUser): IMessage =>
    [...messages].filter(
      (message) =>
        (String(message.from.id) === me && String(message.to.id) === String(user.id)) ||
        (String(message.from.id) === String(user.id) && String(message.to.id) === me),
    )[0];

  return (
    <div className={css.list}>
      {users
        .filter((user) => String(user.id) !== me)
        .sort(
          (a, b) =>
            (new Date(getRoomLastMessage(b)?.sent_at)?.getTime() || 0) -
            (new Date(getRoomLastMessage(a)?.sent_at)?.getTime() || 0),
        )
        .map((user) => {
          const subheader = getRoomLastMessage(user)?.content || 'No message...';

          return (
            <NavLink key={user.id} to={`/room/${user.id}`}>
              <Card
                className={css.card}
                sx={{ backgroundColor: String(user.id) === userId ? 'lightgray' : null }}
              >
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
