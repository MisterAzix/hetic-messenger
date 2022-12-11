import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { ChatForm } from "../features/Chat/ChatForm";

export default function ChatScreen({
  route,
  navigation,
}: RootTabScreenProps<"Chat">) {
  const { userId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat - {userId}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ChatForm userId={userId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
