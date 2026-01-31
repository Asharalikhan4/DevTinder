import admin from "firebase-admin";
import { google } from "googleapis";
import path from "path";

// Initialize Firebase Admin SDK
const firebaseConfig = path.join(import.meta.dirname, "../devtinder-cef03-firebase-adminsdk-fbsvc-e4148cfa26.json");
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// Function to send a notification to a device
export async function sendNotification(token, title, body) {
  const message = {
    notification: {
      title,
      body,
    },
    android: {
      priority: "high",
    },
    apns: {
      payload: {
        aps: {
          alert: { title, body },
          sound: "default",
          contentAvailable: true,
        },
      },
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Function to get an access token using Google OAuth2
export async function getAccessToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../devtinder-cef03-firebase-adminsdk-fbsvc-e4148cfa26.json"), // path to the service account key
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  try {
    const accessToken = await auth.getAccessToken();
    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};