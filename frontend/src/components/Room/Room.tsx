import UserList from '../UserList/List';
import { Outlet } from 'react-router-dom';
import css from './Room.module.scss';

export default function Room() {
  return (
    <div className={css.container}>
      <div className={css.aside}>
        <h2 className={css.title}>User List</h2>
        <div className={css.list}>
          <UserList />
        </div>
      </div>
      <div className={css.chatContainer}>
        <Outlet />
      </div>
    </div>
  );
}
