import { firebaseConfig } from "../config";
import firebase from "firebase";


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const db = firebase.firestore();

  export default db;

  