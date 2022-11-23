import { useEffect, useState } from 'react';

interface IUser {
  id: number;
  username: string;
}

export function useGetUsers(): IUser[] {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user-list`, {
      next: { revalidate: 10 },
    });

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
