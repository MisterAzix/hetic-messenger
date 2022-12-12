import { useEffect } from "react";
import { addOneMessage, AppDispatch, AppState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import EventSourceSSE, {
  EventSourceListener,
  MessageEvent,
} from "react-native-sse";
import "react-native-url-polyfill/auto";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_MERCURE_URL } from "@env";

export function useHandleMessage() {
  const dispatch: AppDispatch = useDispatch();

  const { jwt } = useSelector((state: AppState) => ({
    jwt: state.auth,
  }));

  const handleMessage = (e: MessageEvent) => {
    let data;
    if (typeof e.data === "string") {
      data = JSON.parse(e.data);
    }
    const sentAt = new Date(data.sent_at.date);
    sentAt.setHours(sentAt.getHours() + 1);
    dispatch(
      addOneMessage({
        from: data.from,
        to: data.to,
        content: data.content,
        sent_at: sentAt,
      })
    );
  };

  useEffect(() => {
    const url = new URL(`${APP_MERCURE_URL}.well-known/mercure`);
    url.searchParams.append("topic", "https://example.com/my-private-topic");

    const es = new EventSourceSSE(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const listener: EventSourceListener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        handleMessage(event);
      }
    };

    es.addEventListener("open", listener);
    es.addEventListener("message", listener);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);
}
