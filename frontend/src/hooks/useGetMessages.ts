import { useEffect, useState } from 'react';
import { IMessage } from '../types';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

type IGetMessagesReponse = IMessage[];

export function useGetMessages(): IGetMessagesReponse {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { jwt } = useSelector((state: AppState) => ({
    jwt: state.auth,
  }));

  const fetchMessages = async () => {
    const res = await fetch('http://localhost:8245/messages', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (res) {
      const data = await res.json();
      setMessages(data.messages);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return messages;
}
