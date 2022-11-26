import { useEffect, useState } from 'react';

interface IUser {
  id: number;
  username: string;
}

type IGetUsersReponse = IUser[];

export function useGetUsers(): IGetUsersReponse {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8245/user-list');

    if (res) {
      const data = await res.json();
      setUsers(data.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return users;
}
