import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCHAS4YStMODoP1F3ZmoldNzz8fNMOgL4Y",
  authDomain: "smart-hospital-93a43.firebaseapp.com",
  databaseURL:
    "https://smart-hospital-93a43-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-hospital-93a43",
  storageBucket: "smart-hospital-93a43.firebasestorage.app",
  messagingSenderId: "598927292000",
  appId: "1:598927292000:web:1ddcdf768c2bd70604b505",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
