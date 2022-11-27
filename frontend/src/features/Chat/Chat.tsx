import { ChatForm } from './ChatForm';
import css from './Chat.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addOneMessage, AppDispatch, AppState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { parseJwt } from '../../utils';
import { Card, CardContent } from '@mui/material';

export function Chat() {
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
          roomMessages.reverse().map((message, key) => (
            <Card
              sx={{
                maxWidth: '75%',
                marginY: '0.5rem',
                marginLeft: String(message.from.id) === me ? 'auto' : null,
              }}
              key={key}
            >
              <CardContent>
                <strong>
                  {message.from.username} ({new Date(message.sent_at).toLocaleString()}):
                </strong>{' '}
                {message.content}
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No message yet!</div>
        )}
      </div>
      <ChatForm />
    </div>
  );
}
