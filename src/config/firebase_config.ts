import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAGxyCD8cY2qQK3sN9yi8Se6ZgBXnnxBOk",
    authDomain: "sensor-reading-e89e9.firebaseapp.com",
    databaseURL: "https://sensor-reading-e89e9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sensor-reading-e89e9",
    storageBucket: "sensor-reading-e89e9.appspot.com",
    messagingSenderId: "200855507801",
    appId: "1:200855507801:web:d84816962f213449ddb248"
};
//
const app = initializeApp(firebaseConfig,);
export const auth = getAuth(app);
export const db = getDatabase(app);
//
