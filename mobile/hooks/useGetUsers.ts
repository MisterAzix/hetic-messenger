import { useEffect, useState } from "react";
import { IUser } from "../types/";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { APP_SYMFONY_URL } from "@env";

type IGetUsersReponse = IUser[];

export function useGetUsers(): IGetUsersReponse {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(`${APP_SYMFONY_URL}user-list`);

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
