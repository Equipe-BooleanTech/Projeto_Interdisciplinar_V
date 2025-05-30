import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabConfig = [
  {
    name: 'dashboard/index',
    title: 'Dashboard',
    icon: (focused: boolean, color: string) => (
      <Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
    ),
    show: true,
  },
  {
    name: 'vehicles/index',
    title: 'Veículos',
    icon: (focused: boolean, color: string) => (
      <Ionicons name={focused ? 'car-sport-sharp' : 'car-sport-outline'} size={24} color={color} />
    ),
    show: true,
  },
  {
    name: 'gas-stations/index',
    title: 'Postos de Gasolina',
    icon: (focused: boolean, color: string) => (
      <Ionicons name={focused ? 'locate-sharp' : 'locate-outline'} size={24} color={color} />
    ),
    show: true,
  },
  {
    name: 'notifications/index',
    title: 'Notificações',
    icon: (focused: boolean, color: string) => (
      <Ionicons name={focused ? 'notifications-sharp' : 'notifications-outline'} size={24} color={color} />
    ),
    show: true,
  },
  {
    name: 'account/index',
    title: 'Conta',
    icon: (focused: boolean, color: string) => (
      <Ionicons name={focused ? 'person-sharp' : 'person-outline'} size={24} color={color} />
    ),
    show: true,
  }
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ccc',
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: { height: 70, backgroundColor: '#454f2c' },
        headerShown: false,
        tabBarLabelStyle: { fontSize: 14, marginBottom: 5 },
        tabBarIconStyle: { marginTop: 5 },
        tabBarActiveBackgroundColor: '#454f2c',
        tabBarInactiveBackgroundColor: '#454f2c',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      {tabConfig
        .filter((tab) => {
          return tab.show;
        })
        .map(({ name, title, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarIcon: ({ color, focused }) => icon(focused, color),
            }}
          />
        ))}
    </Tabs>
  );
}
