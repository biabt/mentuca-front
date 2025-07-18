import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext"

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
}