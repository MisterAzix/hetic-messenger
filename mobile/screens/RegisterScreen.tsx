import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RegisterForm } from "../features/Register/RegisterForm";
import { Text } from "@react-native-material/core";
import { RootStackScreenProps } from "../types";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} variant="h3">
        Register now!
      </Text>
      <RegisterForm navigation={navigation} />
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
