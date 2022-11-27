import { ChatForm } from './ChatForm';
import css from './Chat.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch, AppState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOneMessage } from '../../store/messageSlice';
import { parseJwt } from '../../utils';
import { Card, CardContent } from '@mui/material';

export default function Chat() {
  const dispatch: AppDispatch = useDispatch();
  const { userId } = useParams();

  const { jwt, messages } = useSelector((state: AppState) => ({
    jwt: state.auth,
    messages: state.messages,
  }));

  const me = String(parseJwt(jwt).mercure.payload.userid);

  const roomMessages = messages.filter(
    (message) =>
      (String(message.from.id) === me && String(message.to.id) === String(userId)) ||
      (String(message.from.id) === String(userId) && String(message.to.id) === me),
  );
  console.log(roomMessages);

  const handleMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    dispatch(addOneMessage(data));
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
      <div className={css.messages}>
        {roomMessages.length ? (
          roomMessages.reverse().map((message, key) =>
            String(message.from.id) === me ? (
              <Card sx={{ maxWidth: '75%', marginY: '0.5rem', marginLeft: 'auto' }} key={key}>
                <CardContent>{message.content}</CardContent>
              </Card>
            ) : (
              <Card sx={{ maxWidth: '75%', marginY: '0.5rem' }} key={key}>
                <CardContent>{message.content}</CardContent>
              </Card>
            ),
          )
        ) : (
          <div>No message yet!</div>
        )}
      </div>
      <ChatForm />
    </div>
  );
}
