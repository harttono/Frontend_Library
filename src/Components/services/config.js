import firebase from 'firebase';
import 'firebase/firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAbspuaXMblb2fJswUwR9c3qB3-dUutUTg",
    authDomain: "library-88144.firebaseapp.com",
    databaseURL: "https://library-88144.firebaseio.com",
    projectId: "library-88144",
    storageBucket: "library-88144.appspot.com",
    messagingSenderId: "851935245609",
    appId: "1:851935245609:web:790ad077af443a0916b338",
    measurementId: "G-ZKK7L3MX0T"
};

firebase.initializeApp(firebaseConfig);

const Storage = firebase.storage();

export {Storage}