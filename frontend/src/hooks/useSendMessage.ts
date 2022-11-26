interface ISendMessageRequest {
  jwt: string;
  id: string;
  message: string;
}

interface ISendMessageResponse {
  success: boolean;
  message: string;
}

export default function useSendMessage() {
  return function ({ jwt, id, message }: ISendMessageRequest): Promise<ISendMessageResponse> {
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
