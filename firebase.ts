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

// Function to check if config is still placeholder
export const isFirebaseConfigured = (): boolean => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};


// Initialize Firebase, preventing re-initialization.
// FIX: Added a guard to prevent initialization with placeholder credentials, which crashes the app on deployment.
if (isFirebaseConfigured() && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


// Export services using v8 syntax, guarded by config check
export const firestore = isFirebaseConfigured() ? firebase.firestore() : null!;
export const auth = isFirebaseConfigured() ? firebase.auth() : null!;
export const googleProvider = isFirebaseConfigured() ? new firebase.auth.GoogleAuthProvider() : null!;