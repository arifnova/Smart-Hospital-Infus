import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7O-u401s2Sa3mcWkGfNHqdN2MxZ7dnqc",
  authDomain: "gedung-cerdas.firebaseapp.com",
  databaseURL: "https://gedung-cerdas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gedung-cerdas",
  storageBucket: "gedung-cerdas.firebasestorage.app",
  messagingSenderId: "1079895536024",
  appId: "1:1079895536024:web:b488f64c7de883e570bbed",
  measurementId: "G-KVPQT6H2B6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
