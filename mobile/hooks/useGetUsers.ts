import { useEffect, useState } from "react";
import { IUser } from "../types/";

type IGetUsersReponse = IUser[];

export function useGetUsers(): IGetUsersReponse {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8245/user-list");

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
