import useAppLoading from '@app/hooks/useAppLoading'

import { useEffect } from 'react'

import { Tabs } from 'expo-router'

import { Calendar, Home, User } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const setAppLoading = useAppLoading()

  useEffect(() => {
    setAppLoading(false)
  }, [setAppLoading])

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Booking',
          tabBarIcon: ({ color }) => <Calendar size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}
