import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import firebase from 'firebase/app'

require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCfqZoAkpuSBfp9n9sN3RCyHPV5wmA6cxs",
    authDomain: "ser401-project-37.firebaseapp.com",
    databaseURL: "https://ser401-project-37.firebaseio.com",
    projectId: "ser401-project-37",
    storageBucket: "ser401-project-37.appspot.com",
    messagingSenderId: "46311260060",
    appId: "1:46311260060:web:1e381fb482afc30c955259"
})

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
  });
  
createApp(App).use(router).use(store).mount('#app')