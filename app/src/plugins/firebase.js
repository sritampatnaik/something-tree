import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBc7E3eFAhf2YzMNA-Tw3vytwKfj0dAbAQ",
    authDomain: "remote-internship-8fcdc.firebaseapp.com",
    databaseURL: "https://remote-internship-8fcdc.firebaseio.com",
    projectId: "remote-internship-8fcdc",
    storageBucket: "remote-internship-8fcdc.appspot.com",
    messagingSenderId: "740590993978",
    appId: "1:740590993978:web:9024d3e605e3247b96ab03",
    measurementId: "G-QCRTQ82M0S"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authModule = firebase.auth;
export const db = firebase.firestore();