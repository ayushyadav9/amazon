import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBSGIB7NGop_5uWT7gg9GDMNVClNO7Me_w",
    authDomain: "fir-30f81.firebaseapp.com",
    projectId: "fir-30f81",
    storageBucket: "fir-30f81.appspot.com",
    messagingSenderId: "342021472118",
    appId: "1:342021472118:web:1058a6c8a897e35009c457",
    measurementId: "G-HTE9GQVFPL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };