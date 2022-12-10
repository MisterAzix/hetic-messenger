import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Button } from "@react-native-material/core";

export default function UsersListScreen({
  navigation,
}: RootTabScreenProps<"UsersList">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UsersList</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button
        title={"Chat 1"}
        color="primary"
        variant={"text"}
        onTouchStart={() => navigation.navigate("Chat", { id: 1 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
