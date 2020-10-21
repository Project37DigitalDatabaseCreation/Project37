const app = firebase.initializeApp({
    apiKey: "AIzaSyCfqZoAkpuSBfp9n9sN3RCyHPV5wmA6cxs",
    authDomain: "ser401-project-37.firebaseapp.com",
    databaseURL: "https://ser401-project-37.firebaseio.com",
    projectId: "ser401-project-37",
    storageBucket: "ser401-project-37.appspot.com",
    messagingSenderId: "46311260060",
    appId: "1:46311260060:web:1e381fb482afc30c955259"
  });

const db = app.firestore();

let generalStandards = {};
let standards = {};

function populateStandards() {
    let appDiv = document.getElementById("app");

    generalStandards.forEach(doc => {
        let gs = doc.data();
        let gsId = doc.id;

        appDiv.innerHTML += "<div id=&quot;" + gsId + 
                            "&quot;><h4>General Standard " + gs.number + 
                            " &mdash; " + gs.title +
                            ": </h4>" + gs.description + "<br /><br />" +
                            "<span style='font-style: italic'>" + gs.annotation + "</span><br /></div>";
        standards.forEach(doc =>{
            let s = doc.data();
            if(s.general_standard_ref.id == gsId) {
                appDiv.innerHTML += "<div id='" + doc.id +
                                    "'><br />" + gs.number + "." + s.number +
                                    " " + s.title + "<br />" +
                                    s.annotation;
            }
        });
    });
};

db.collection("GeneralStandards").get()
.then(result => {
    generalStandards = result;
    db.collection("Standards").get()
    .then(result => {
        standards = result;
        populateStandards();   
    })
})
.catch(err => { console.error(err) });