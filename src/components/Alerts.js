import { Alert } from "react-native";

export const ConfirmAlert = (title, message, onPress) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => {
          return null;
        }
      },
      {
        text: "Confirm",
        onPress
      }
    ],
    { cancelable: false }
  );

export const MessageAlert = (title, message) => Alert.alert(title, message);
