import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfqZoAkpuSBfp9n9sN3RCyHPV5wmA6cxs",
    authDomain: "ser401-project-37.firebaseapp.com",
    databaseURL: "https://ser401-project-37.firebaseio.com",
    projectId: "ser401-project-37",
    storageBucket: "ser401-project-37.appspot.com",
    messagingSenderId: "46311260060",
    appId: "1:46311260060:web:1e381fb482afc30c955259"
}

// initialize the firebase app
firebase.initializeApp(firebaseConfig)

// initialize firestore service
const projectFirestore = firebase.firestore()

export { projectFirestore }