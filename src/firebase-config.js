// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,
// } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbNF8RlkhrSTBmGub6mWMtCfJIBE23PPw",
  authDomain: "back2bandung.firebaseapp.com",
  databaseURL: "https://back2bandung-default-rtdb.firebaseio.com",
  projectId: "back2bandung",
  storageBucket: "back2bandung.appspot.com",
  messagingSenderId: "1055417846854",
  appId: "1:1055417846854:web:f80aace8996beb4fcf0e47",
  measurementId: "G-9TZPBMY2S6",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
