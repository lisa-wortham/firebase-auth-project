import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsnNpO4tLtHgzvjqfniZUGTqRZjFtB69k",
  authDomain: "fir-auth-project-7d889.firebaseapp.com",
  projectId: "fir-auth-project-7d889",
  storageBucket: "fir-auth-project-7d889.firebasestorage.app",
  messagingSenderId: "585908116315",
  appId: "1:585908116315:web:996eea0dcfce0d9941587e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

