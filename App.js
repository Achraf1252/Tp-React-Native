import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppBar from './screens/AppBar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// --- Écrans ---
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>🏠 Écran d'accueil</Text>
      <Button
        title="Aller aux détails"
        onPress={() => navigation.navigate('Details', { id: 42 })}
      />
    </View>
  );
}


function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>📄 Écran de détails</Text>
      {route.params && <Text>ID reçu : {route.params.id}</Text>}
    </View>
  );
}


function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>⚙️ Paramètres</Text>
    </View>
  );
}


// --- Navigation par pile ---
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen  name="Accueil"  component={HomeScreen}  options={{
    headerStyle: { backgroundColor: '#007AFF' },    headerTintColor: '#fff',    headerTitleStyle: { fontWeight: 'bold' },
  }}
/>

      <Stack.Screen  name="Details"  component={DetailsScreen}  options={{ title: 'Mes Détails Personnalisés' }}
/>
    </Stack.Navigator>
  );
}


// --- Navigation par onglets ---
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavigationContainer>
          <AppBar /> {/* Barre haute personnalisée */}
          <Tab.Navigator
  screenOptions={{
    headerShown: false,          // cacher le header
    tabBarActiveTintColor: 'blue', // couleur de l’onglet actif
    tabBarInactiveTintColor: 'gray', // couleur de l’onglet inactif
    tabBarStyle: { backgroundColor: '#f0f0f0' }, // style de la barre
    tabBarLabelStyle: { fontSize: 14 }, // style du texte
  }}
>
  <Tab.Screen  name="Maison"  component={HomeStack}  options={{ tabBarIcon: ({ color, size }) => (  <Ionicons name="home" size={size} color={color} />     ),
  }} />
<Tab.Screen name="Paramètres" component={SettingsScreen} options={{ tabBarIcon: ({ color,    size }) => ( <Ionicons name="settings" size={size} color={color} />  ),
  }}  />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
