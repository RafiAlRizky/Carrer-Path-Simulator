// Fix: Use Firebase v8 namespaced import
import firebase from 'firebase/app';
// Fix: Import auth and firestore for side effects
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDzoRdnHEE4zuMGymz78v_-XdYVcHF0VQ",
    authDomain: "carrer-path-simulator.firebaseapp.com",
    projectId: "carrer-path-simulator",
    storageBucket: "carrer-path-simulator.appspot.com",
    messagingSenderId: "125958136938",
    appId: "1:125958136938:web:b6526b3526aa4c0f1dd613",
    measurementId: "G-RM53MD5YNE"
};

// Initialize Firebase
// Fix: Use v8 initialization syntax and prevent re-initialization
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export services
// Fix: Use v8 namespaced exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();