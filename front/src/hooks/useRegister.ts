export default function useRegister() {
  return function (username: string, password: string, confirmPassword: string) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}user/new`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        confirm_password: confirmPassword,
      })
    }).then((response) => response?.json()).catch(err => console.error(err));
  };
}
