import { Text, View } from "react-native";

export const options = {
  title: "設定",
};

export default function SettingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>這是 設定 頁面</Text>
    </View>
  );
}
