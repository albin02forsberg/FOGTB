import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYPhxI4cjUnhD7JXJsXGXH1hoTgc8RPJM",
    authDomain: "fogtb-d2850.firebaseapp.com",
    projectId: "fogtb-d2850",
    storageBucket: "fogtb-d2850.appspot.com",
    messagingSenderId: "37292642742",
    appId: "1:37292642742:web:2640a40d11f4daeb987117",
    measurementId: "G-7KFRLB8MW5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const firestore = firebase.firestore();