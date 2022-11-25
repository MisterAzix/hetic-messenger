interface User {
  username: string;
  password: string;
}

export default function useGetJWT() {
  return function ({ username, password }: User) {
    const credentials = btoa(`${username}:${password}`);

    return fetch('http://localhost:8245/login', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then((data) => data.json());
  };
}
