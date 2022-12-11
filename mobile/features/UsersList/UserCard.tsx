import { Avatar, HStack, Surface, Text } from "@react-native-material/core";
import { View } from "../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { IUser } from "../../types/";

export const UserCard = ({
  style,
  navigation,
  user,
  subheader,
}: {
  style?: any;
  navigation: any;
  user: IUser;
  subheader: string;
}) => {
  return (
    <Pressable
      style={style}
      onPress={() => navigation.navigate("Chat", { userId: user.id })}
    >
      <Surface
        elevation={1}
        category="medium"
        style={{
          justifyContent: "center",
          padding: 16,
          height: 70,
        }}
      >
        <HStack spacing={10}>
          <Avatar label={user.username} autoColor></Avatar>
          <View style={styles.cardContent}>
            <Text variant="h6">{user.username}</Text>
            <Text>{subheader}</Text>
          </View>
        </HStack>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    justifyContent: "center",
  },
});
