import { initializeApp} from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore, collection, getDocs, onSnapshot, addDoc
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBFjHaa17SX0a_sb_FjxFaQM1BZdTUnnVk',
  authDomain: 'social-network-sn13.firebaseapp.com',
  projectId: 'social-network-sn13',
  storageBucket: 'social-network-sn13.appspot.com',
  messagingSenderId: '750307099231',
  appId: '1:750307099231:web:58718e5593c7c50e5ad1ea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export function registerEmail(email, password) {
  const promesaRegistro = createUserWithEmailAndPassword(auth, email, password);
  return promesaRegistro;
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const promesaRegistroGoogle = signInWithPopup(auth, provider);
  return promesaRegistroGoogle;
}

export function SignInEmail(email, password) {
  const promesaLoginEmailAndPassword = signInWithEmailAndPassword(auth, email, password);
  return promesaLoginEmailAndPassword;
}

// Firestore
// Obtiene la base de datos Firestore
export const db = getFirestore(app);
// REFERENCIA la coleccion (Post) de la base de datos (db)
export const colRef = collection(db, 'Posts');
console.log(db);

export const getPosts = () => getDocs(colRef);
export const onGetPosts = () => console.log(onGetPosts);

export { onSnapshot, getDocs, addDoc}