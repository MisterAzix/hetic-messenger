import { ScrollView, StyleSheet } from "react-native";
import { IMessage, IUser } from "../types/";
import { RootTabScreenProps } from "../types";
import { Stack } from "@react-native-material/core";
import { useGetUsers } from "../hooks/useGetUsers";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { parseJwt } from "../utils";
import { UserCard } from "../features/UsersList/UserCard";
import { useHandleMessage } from "../hooks/useHandleMessage";

export default function UsersListScreen({
  navigation,
}: RootTabScreenProps<"UsersList">) {
  useHandleMessage();
  const users = useGetUsers();

  const { jwt, messages } = useSelector((state: AppState) => ({
    jwt: state.auth,
    messages: state.messages,
  }));

  const me = String(parseJwt(jwt).mercure.payload.userid);

  if (!users) return <div>Loading users...</div>;

  const getRoomLastMessage = (user: IUser): IMessage =>
    [...messages].filter(
      (message) =>
        (String(message.from.id) === me &&
          String(message.to.id) === String(user.id)) ||
        (String(message.from.id) === String(user.id) &&
          String(message.to.id) === me)
    )[0];

  return (
    <ScrollView style={styles.container}>
      <Stack spacing={8}>
        {users
          .filter((user) => String(user.id) !== me)
          .sort(
            (a, b) =>
              (new Date(getRoomLastMessage(b)?.sent_at)?.getTime() || 0) -
              (new Date(getRoomLastMessage(a)?.sent_at)?.getTime() || 0)
          )
          .map((user) => {
            const lastMessage = getRoomLastMessage(user);

            return (
              <UserCard
                key={user.id}
                navigation={navigation}
                user={user}
                lastMessage={lastMessage}
              />
            );
          })}
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
