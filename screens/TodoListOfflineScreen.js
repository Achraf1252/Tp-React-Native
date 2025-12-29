import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  loadTodos,
  addTodoOffline,
  updateTodoOffline,
  deleteTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const refreshTodos = () => {
    setTodos(loadTodos());
  };

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;
    if (editingId) {
      // UPDATE OFFLINE
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      // ADD OFFLINE
      addTodoOffline(title);
    }
    setTitle("");
    refreshTodos();
  };

  const handleDelete = (id) => {
    deleteTodoOffline(id);
    refreshTodos();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const bgColor = theme === "dark" ? "#121212" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const borderColor = theme === "dark" ? "#333333" : "#cccccc";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Theme toggle */}
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {/* Add / Update */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tâche offline"
          placeholderTextColor={theme === "dark" ? "#999" : "#666"}
          value={title}
          onChangeText={setTitle}
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
            },
          ]}
        />
        <Button
          title={editingId ? "✏️ Mettre à jour" : "➕ Ajouter hors ligne"}
          onPress={handleAddOrUpdate}
        />
      </View>

      {todos.length === 0 ? (
        <Text style={[styles.emptyText, { color: textColor }]}>
          Aucune tâche disponible hors ligne
        </Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.todoItem,
                { borderColor, borderBottomColor: borderColor },
              ]}
            >
              <Text style={[styles.todoTitle, { color: textColor }]}>
                {item.title}
              </Text>
              <View style={styles.buttonGroup}>
                <Button
                  title="✏️"
                  onPress={() => {
                    setTitle(item.title);
                    setEditingId(item.id);
                  }}
                />
                <Button
                  title="🗑️"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 5,
  },
});
