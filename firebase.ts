// FIX: Switched to Firebase v8 namespaced API using compat libraries to resolve module export errors with Firebase v9+.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// IMPORTANT: Replace this with your web app's Firebase configuration.
// You can get this from the Firebase console for your project.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase, preventing re-initialization.
// FIX: Added a guard to prevent initialization with placeholder credentials, which crashes the app on deployment.
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


// Export services using v8 syntax
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();