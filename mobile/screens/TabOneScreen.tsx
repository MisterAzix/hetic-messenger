import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import RegisterForm from "../features/Register/RegisterForm";
import { Text } from "@react-native-material/core";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading} variant="h2">
        Register now!
      </Text>
      <RegisterForm />
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
