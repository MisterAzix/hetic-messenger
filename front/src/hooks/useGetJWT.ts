export default function useGetJWT() {
  return function (username: string, password: string) {
    const credentials = btoa(`${username}:${password}`);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then((response) => response?.json());
  };
}
