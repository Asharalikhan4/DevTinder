import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import LandingScreen from "./src/screens/LandingScreen/LandingScreen";
import SigninScreen from "./src/screens/SigninScreen/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen/SignupScreen";
import FeedScreen from "./src/screens/FeedScreen/FeedScreen";
import {UserProvider} from "./src/context/UserContext";
import {StatusBar} from "react-native";
import {PermissionsAndroid} from "react-native";
import messaging from "@react-native-firebase/messaging";
import {Platform} from "react-native";
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getToken();
      // Alert.alert("Permission Granted");
    } else {
      // Alert.alert("Permission Denied");
    }
  };

  const requestPermissionIOS = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestPermissionAndroid();
    } else {
      requestPermissionIOS();
    }
  }, []);

  const onDisplayNotification = async remoteMessage => {
    // Request permissions (required for iOS)
    // await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "important_channel",
      name: "Urgent Notifications",
      importance: AndroidImportance.HIGH,
      sound: "default",
      vibration: true,
    });

    // Display a notification
    const res = await notifee.displayNotification({
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        importance: AndroidImportance.HIGH,
        sound: "default",
        vibrationPattern: [300, 500],
        category: AndroidCategory.MESSAGE,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: {
          id: "default",
        },
      },
    });
    console.log("function called 2", res);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("token", token);
  };

  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content" // or "dark-content"
          backgroundColor="#ff4d4f" // Android only
          translucent={false} // Android only
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LandingScreen"
            screenOptions={{headerShown: false}}>
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
