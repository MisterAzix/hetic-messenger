export default function useSendMessage() {
  return function (id: number, message: string) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}ping/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
      }),
    })
      .then((response) => response?.json())
      .catch((err) => console.error(err));
  };
}
