import { UserList } from './List';
import { Outlet } from 'react-router-dom';
import css from './Room.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, getAllMessages } from '../../store';
import { useGetMessages } from '../../hooks/useGetMessages';

export function Room() {
  const dispatch: AppDispatch = useDispatch();
  const messages = useGetMessages();

  useEffect(() => {
    dispatch(getAllMessages(messages));
  }, [messages]);

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
