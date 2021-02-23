import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAXFOdhzjnE_Yy7B6IYzufKREXfpEUU2p8",
  authDomain: "sweeter-tweeter.firebaseapp.com",
  projectId: "sweeter-tweeter",
  storageBucket: "sweeter-tweeter.appspot.com",
  messagingSenderId: "834961865851",
  appId: "1:834961865851:web:4d36e21742ae0be96436de",
  measurementId: "G-60RM3F6333",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebaseApp.firestore();
const authentication = firebase.auth();
const Googleprovider = new firebase.auth.GoogleAuthProvider();

export { authentication, Googleprovider, storage };
export default database;
