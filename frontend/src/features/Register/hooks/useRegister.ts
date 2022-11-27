interface IRegisterRequest {
  username: string;
  password: string;
  confirm_password: string;
}

interface IRegisterResponse {
  success: boolean;
  message?: string;
  user?: any;
}

export function useRegister() {
  return function ({
    username,
    password,
    confirm_password,
  }: IRegisterRequest): Promise<IRegisterResponse> {
    return fetch('http://localhost:8245/user/new', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        confirm_password,
      }),
    })
      .then((response) => response?.json())
      .catch((err) => console.error(err));
  };
}
