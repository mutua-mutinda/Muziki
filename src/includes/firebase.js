import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyASx7Jy12fe6UPsPoXC807LVDKzQyqNff4",
  authDomain: "muziki-8a2a3.firebaseapp.com",
  projectId: "muziki-8a2a3",
  storageBucket: "muziki-8a2a3.appspot.com",
  messagingSenderId: "928784879181",
  appId: "1:928784879181:web:0be1f647e5b8fe33be9604",
  measurementId: "G-692J27PVLV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth =  firebase.auth()

const db =  firebase.firestore()

const storage = firebase.storage()

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs'); 
const commentsCollection = db.collection('comments'); 

export {
    auth,
    db,
    usersCollection,
    songsCollection,
    commentsCollection,
    storage
}