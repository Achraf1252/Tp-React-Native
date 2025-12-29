import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import AppDrawer from "./navigation/AppDrawer";
import LoginScreen from "./screens/LoginScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppDrawer /> : <LoginScreen />;
}

function MainApp() {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.dark : styles.light,
      ]}
    >
      <TodoListOfflineScreen />
    </View>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepareDb = async () => {
      await initDB(); // attendre SQLite
      setDbReady(true); // OK pour afficher l'app
    };
    prepareDb();
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#121212",
  },
});
