import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBzvqKweePfkwqSk6NyBntUeqQGsvcAkUM",
  authDomain: "play-gen.firebaseapp.com",
  databaseURL: "https://play-gen.firebaseio.com",
  projectId: "play-gen",
  storageBucket: "",
  messagingSenderId: "941862340381",
  appId: "1:941862340381:web:1cfc68832339786d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
