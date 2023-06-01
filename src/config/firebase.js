// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFjHaa17SX0a_sb_FjxFaQM1BZdTUnnVk",
  authDomain: "social-network-sn13.firebaseapp.com",
  projectId: "social-network-sn13",
  storageBucket: "social-network-sn13.appspot.com",
  messagingSenderId: "750307099231",
  appId: "1:750307099231:web:58718e5593c7c50e5ad1ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export function registerEmail(email, password) {
  const auth = getAuth();
  const promesaRegistro = createUserWithEmailAndPassword(auth, email, password)
  return promesaRegistro
}
/*   .catch((error) => {
      let errorMessage = '';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid e-mail adress';
          break;
        case 'auth/weak-password':
          errorMessage = 'Weak password. Must be at least 6 characters.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'E-mail already in use';
          break;
        // Otros códigos de error que desees manejar
        // case 'auth/another-error-code':
        //   errorMessage = 'Mensaje de error personalizado.';
        //   break;
        default:
          errorMessage = "Couldn't register your account. Please verify e-mail and password.";
          break;
      } 

      throw new Error(errorMessage);
    });

  return promesaRegistro;
} */