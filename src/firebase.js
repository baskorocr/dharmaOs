import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC12v0P_uFvG5GWlWjfg2bsz43f2J9qcqg",
  authDomain: "cgsys-4fb07.firebaseapp.com",
  projectId: "cgsys-4fb07",
  storageBucket: "cgsys-4fb07.appspot.com",
  messagingSenderId: "552254858492",
  appId: "1:552254858492:web:53e4ff8cb4fc25325a6379",
  measurementId: "G-M67C2EMXYZ",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
