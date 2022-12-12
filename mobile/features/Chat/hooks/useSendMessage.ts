import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { IMessage } from "../../../types/";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_SYMFONY_URL } from "@env";

interface ISendMessageRequest {
  id: string;
  message: string;
}

type ISendMessageResponse = IMessage;

export function useSendMessage() {
  const { jwt } = useSelector((state: AppState) => ({
    jwt: state.auth,
  }));

  return function ({
    id,
    message,
  }: ISendMessageRequest): Promise<ISendMessageResponse> {
    return fetch(`${APP_SYMFONY_URL}message/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
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
