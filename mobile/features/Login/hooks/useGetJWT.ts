// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_SYMFONY_URL } from "@env";

interface IGetJWTRequest {
  username: string;
  password: string;
}

interface IGetJWTResponse {
  success: boolean;
  JWT?: string;
  message?: string;
}

export function useGetJWT() {
  return function ({
    username,
    password,
  }: IGetJWTRequest): Promise<IGetJWTResponse> {
    const credentials = btoa(`${username}:${password}`);

    return fetch(`${APP_SYMFONY_URL}login`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then((data) => data.json());
  };
}
