// Firebase SDK
importScripts = false; // ignore editor warning

const firebaseConfig = {
    apiKey: "AIzaSyDhmnsglj0VHtCqyhKeYe1uYeuhZiIaGn8",
    authDomain: "grupchat-6e259.firebaseapp.com",
    projectId: "grupchat-6e259",
    storageBucket: "grupchat-6e259.firebasestorage.app",
    messagingSenderId: "730321727376",
    appId: "1:730321727376:web:063c739b8302a89b3a4d15"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        console.log("Auth persistence: SESSION");
    })
    .catch(error => {
        console.error(error);
    });

const auth = firebase.auth();
const db = firebase.firestore();