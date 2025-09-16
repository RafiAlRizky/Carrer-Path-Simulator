import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
