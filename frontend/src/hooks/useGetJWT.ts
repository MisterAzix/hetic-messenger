interface IGetJWTRequest {
  username: string;
  password: string;
}

interface IGetJWTResponse {
  success: boolean;
  JWT?: string;
  message?: string;
}

export default function useGetJWT() {
  return function ({ username, password }: IGetJWTRequest) {
    const credentials = btoa(`${username}:${password}`);

    return fetch('http://localhost:8245/login', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then((data): Promise<IGetJWTResponse> => data.json());
  };
}
