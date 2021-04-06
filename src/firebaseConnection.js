import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyBwAgJCXAxNJ_hxSei_GJcJl35TVuU2kLg",
    authDomain: "filmaria-f6ef9.firebaseapp.com",
    projectId: "filmaria-f6ef9",
    storageBucket: "filmaria-f6ef9.appspot.com",
    messagingSenderId: "109380982097",
    appId: "1:109380982097:web:e58bd0aaf62338637f2f70",
    measurementId: "G-3DEYDCMV90"
  };

  // Initialize Firebase
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase