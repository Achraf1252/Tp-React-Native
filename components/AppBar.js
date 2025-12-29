import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function AppBar({ title = "App" }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button title="Logout" onPress={logout} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
