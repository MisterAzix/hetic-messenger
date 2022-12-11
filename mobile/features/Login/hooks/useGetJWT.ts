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

    return fetch("http://localhost:8245/login", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then((data) => data.json());
  };
}
