import { useEffect } from "react";
import { addOneMessage, AppDispatch } from "../store";
import { useDispatch } from "react-redux";

export function useHandleMessage() {
  const dispatch: AppDispatch = useDispatch();

  const handleMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    dispatch(
      addOneMessage({
        from: data.from,
        to: data.to,
        content: data.content,
        sent_at: data.sent_at.date,
      })
    );
  };

  useEffect(() => {
    const url = new URL("http://localhost:9090/.well-known/mercure");
    url.searchParams.append("topic", "https://example.com/my-private-topic");

    const eventSource = new EventSource(url, { withCredentials: true }); // TODO Fix authorization (actually mercureCookie is not sent)
    eventSource.onmessage = handleMessage;

    console.log(eventSource);

    return () => {
      eventSource.close();
    };
  }, []);
}
