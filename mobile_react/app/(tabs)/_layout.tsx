import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name='index' options={{
        tabBarIcon: ({color}) => (
          <Ionicons name='home-outline' size={22} color={color} />
        )
      }} />
      <Tabs.Screen name='explore' options={{
        tabBarIcon: ({color}) => (
          <Ionicons name='search-outline' size={22} color={color} />
        )
      }} />
      <Tabs.Screen name='notifications' options={{
        tabBarIcon: ({color}) => (
          <Ionicons name='notifications-outline' size={22} color={color} />
        )
      }} />
      <Tabs.Screen name='cart' options={{
        tabBarBadge: 3,
        tabBarIcon: ({color}) => (
          <Ionicons name='cart-outline' size={22} color={color} />
        )
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarIcon: ({color}) => (
          <Ionicons name='person-outline' size={22} color={color} />
        )
      }} />
    </Tabs>
  );
}