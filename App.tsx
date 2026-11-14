import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from './theme';
import DashboardScreen from './screens/DashboardScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProductsScreen from './screens/ProductsScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import { Doodles } from './components/Doodles';

export type RootStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Deliveries: undefined;
  Customers: undefined;
  Alerts: undefined;
  Settings: undefined;
  Shop: undefined;
  Statistics: undefined;
  Products: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    primary: colors.accent,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text, fontWeight: '800', letterSpacing: 0.5 },
            headerTintColor: colors.accent,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'CORNER69',
              headerTitleAlign: 'center',
              // Le sous-titre « ADMINISTRATION » est rendu par l'écran lui-même,
              // sous le titre, pour garder le contrôle du style.
              headerRight: () => <Doodles.Avatar />,
            }}
          />
          <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Commandes' }} />
          <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Produits' }} />
          <Stack.Screen
            name="Statistics"
            component={PlaceholderScreen}
            options={{ title: 'Statistiques' }}
          />
          <Stack.Screen name="Deliveries" component={PlaceholderScreen} options={{ title: 'Livraisons' }} />
          <Stack.Screen name="Customers" component={PlaceholderScreen} options={{ title: 'Clients' }} />
          <Stack.Screen name="Alerts" component={PlaceholderScreen} options={{ title: 'Alertes' }} />
          <Stack.Screen name="Settings" component={PlaceholderScreen} options={{ title: 'Paramètres' }} />
          <Stack.Screen name="Shop" component={PlaceholderScreen} options={{ title: 'Ma Boutique' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
