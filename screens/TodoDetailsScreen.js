import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { removeTodo } from "../store/todosSlice";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTodo(id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>ID : {id}</Text>
      <Button
        title="Supprimer cette tâche"
        color="red"
        onPress={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
});
