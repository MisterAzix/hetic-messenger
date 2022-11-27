import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

interface ISendMessageRequest {
  id: string;
  message: string;
}

interface ISendMessageResponse {
  success: boolean;
  message: string;
}

export function useSendMessage() {
  const { jwt } = useSelector((state: AppState) => ({
    jwt: state.auth,
  }));

  return function ({ id, message }: ISendMessageRequest): Promise<ISendMessageResponse> {
    return fetch(`http://localhost:8245/message/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt,
        message,
      }),
    })
      .then((response) => response?.json())
      .catch((err) => console.error(err));
  };
}
