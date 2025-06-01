import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import LandingScreen from "./src/screens/LandingScreen/LandingScreen";
import SigninScreen from "./src/screens/SigninScreen/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen/SignupScreen";
import FeedScreen from "./src/screens/FeedScreen/FeedScreen";
import { UserProvider } from "./src/context/UserContext";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content" // or "dark-content"
          backgroundColor="#ff4d4f" // Android only
          translucent={false} // Android only
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="FeedScreen" component={FeedScreen} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

export default App;
