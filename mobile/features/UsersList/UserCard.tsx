import { Avatar, HStack, Surface, Text } from "@react-native-material/core";
import { View } from "../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { IMessage, IUser } from "../../types/";
import { formatTimeAgo } from "../../utils";

export const UserCard = ({
  style,
  navigation,
  user,
  lastMessage,
}: {
  style?: any;
  navigation: any;
  user: IUser;
  lastMessage: IMessage;
}) => {
  const subheader = lastMessage?.content || "No message...";
  const sentAt = formatTimeAgo(new Date(lastMessage?.sent_at));

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
            <Text variant="h6" numberOfLines={1}>
              {user.username}
              {sentAt && <Text variant={"subtitle2"}> - {sentAt}</Text>}
            </Text>
            <Text numberOfLines={1}>{subheader}</Text>
          </View>
        </HStack>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    justifyContent: "center",
    flex: 1,
  },
});
