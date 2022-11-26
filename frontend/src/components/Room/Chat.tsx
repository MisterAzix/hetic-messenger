import { ChatForm } from './ChatForm';
import css from './Chat.module.scss';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const { userId } = useParams();

  const [notifications, setNotifications] = useState<string[]>([]);

  const handleMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
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
        <div>Room {userId}</div>
        {notifications.length ? notifications.map((notif) => <Alert>{notif}</Alert>) : null}
      </div>
      <ChatForm />
    </div>
  );
}
