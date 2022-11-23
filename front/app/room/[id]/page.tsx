'use client';

import { ChatForm } from '../../../src/components/ChatForm';
import css from './Room.module.scss';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';

export default function Page({ params }: { params: { id: number } }) {
  const [notifications, setNotifications] = useState<string[]>([]);
  const id = params.id;

  const handleMessage = (e) => {
    console.log(1, e);
    const data = JSON.parse(e.data);
    console.log(2, data);
    setNotifications((prevState) => [...prevState, data.message]);
    setTimeout(() => {
      setNotifications((prevState) => prevState.filter((el) => el !== data.message));
    }, 3000);
  };

  useEffect(() => {
    const url = new URL('http://localhost:9090/.well-known/mercure');
    url.searchParams.append('topic', 'https://example.com/my-private-topic');

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className={css.container}>
      <div>
        <div>Oui</div>
        {notifications.length ? notifications.map((notif) => <Alert>{notif}</Alert>) : null}
      </div>
      <ChatForm id={id} />
    </div>
  );
}
