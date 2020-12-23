import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRBgjYR8jh9M0m3Vv_pp1TrSSmIQ0TJ64",
  authDomain: "gratasys.firebaseapp.com",
  databaseURL: "https://gratasys.firebaseio.com",
  projectId: "gratasys",
  storageBucket: "gratasys.appspot.com",
  messagingSenderId: "666508296317",
  appId: "1:666508296317:web:7d5261770dbab9d49d7114",
  measurementId: "G-QBTW59F9Q8"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();