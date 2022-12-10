import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { LoginForm } from "../features/Login/LoginForm";
import { Text } from "@react-native-material/core";

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"Login">) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} variant="h3">
        Login
      </Text>
      <LoginForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    marginBottom: 25,
  },
});
