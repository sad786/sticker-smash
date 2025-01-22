import { Stack } from "expo-router";
import {StatusBar} from 'expo-status-bar';

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    <Stack.Screen name = "+not-found" options = {{title: "Not Found"}}/>
  </Stack>
  //<StatusBar style='light'/>
  );
}
