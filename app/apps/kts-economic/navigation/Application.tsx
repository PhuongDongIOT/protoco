import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import { useTheme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';

export default function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
      <SafeAreaProvider>
        {/* <NavigationContainer theme={navigationTheme}> */}
          <Stack key={variant} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ presentation: 'modal' }} />
            <Stack.Screen name="signup" options={{ presentation: 'modal' }} />
          </Stack>
        {/* </NavigationContainer> */}
      </SafeAreaProvider>
  );
}
