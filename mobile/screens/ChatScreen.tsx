import { ScrollView, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { ChatForm } from "../features/Chat/ChatForm";
import { AppState } from "../store";
import { useSelector } from "react-redux";
import { parseJwt } from "../utils";
import { Stack, Surface, Text } from "@react-native-material/core";

export default function ChatScreen({
  route,
  navigation,
}: RootTabScreenProps<"Chat">) {
  const { userId } = route.params || {};

  const { jwt, messages } = useSelector((state: AppState) => ({
    jwt: state.auth,
    messages: state.messages,
  }));

  const me = String(parseJwt(jwt).mercure.payload.userid);

  const roomMessages = messages.filter(
    (message) =>
      (String(message.from.id) === me &&
        String(message.to.id) === String(userId)) ||
      (String(message.from.id) === String(userId) &&
        String(message.to.id) === me)
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        <Stack spacing={8}>
          {roomMessages.length
            ? roomMessages.reverse().map((message, key) => (
                <Surface
                  key={key}
                  elevation={1}
                  category="medium"
                  style={{
                    ...styles.card,
                    marginLeft:
                      String(message.from.id) === me ? "auto" : undefined,
                  }}
                >
                  <Text variant={"subtitle2"}>
                    {message.from.username} (
                    {new Date(message.sent_at).toLocaleString()}):
                  </Text>
                  <Text textBreakStrategy={"simple"}>{message.content}</Text>
                </Surface>
              ))
            : null}
        </Stack>
      </ScrollView>
      <View style={styles.formContainer}>
        <ChatForm userId={userId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: "lightgrey",
  },
  formContainer: {
    padding: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  card: {
    justifyContent: "center",
    padding: 16,
    width: "80%",
  },
  separator: {
    marginVertical: 8,
    height: 1,
    width: "100%",
  },
});
