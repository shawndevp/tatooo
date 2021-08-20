import dotenv from 'dotenv'
import firebase from "firebase";
require("dotenv").config()
dotenv.config();

console.log(process.env.REACT_APP_API_KEY)
console.log("testing")

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };  


const firebaseapp= firebase.initializeApp(firebaseConfig);

/* console.log(firebaseapp) */

const fireStore = firebaseapp.firestore()

export default fireStore



  //gitignore, separat fil med apikeys,-> .env