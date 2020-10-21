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

function addStandards1(docRef) {
  let data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 1,
    title: "Instructions make clear how to get started and where to find various course components.",
    annotation: "<p>Information posted at the beginning of the course provides a general course overview, presents the schedule of activities, guides the learner to explore the course site, and indicates what to do first, in addition to listing detailed navigational instructions for the whole course.</p><p>Instructors may choose to incorporate some of this information in the course syllabus. In this case, learners should be directed to the syllabus at the beginning of the course. A useful feature is a &quot;Read Me First&quot; or &quot;Start Here&quot; button or icon on the course home page, linking learners to start-up information.</p><p>Reviewers, use the first visit to the course to experience what new learners encounter on their first visit to the course. Look for clear directions on what to do first, where to find the syllabus, and how to navigate the course.</p><p>Examples of guidance to help learners get acquainted with the course:</p><ol><li>Clear statements about how to get started in the course</li><li>A course &quot;tour&quot;</li><li>A &quot;scavenger hunt&quot; or &quot;syllabus quiz&quot; assignment that leads learners through an exploration of the different parts of the course</li><li>An illustration, table, diagram, visual representation, or mind map that depicts the online and face-to-face portions of a blended course</li></ol><p><span style='font-weight:bold;'>Blended Courses:</span> Instructions in the online classroom make it clear to learners that the course is a blended course, with both online and face-to-face components and activities. Instructions specify the relationship between, and the requirements for, both the online and face-to-face portions of the course.</p>"
  };

  db.collection("Standards").add(data)
  .then(function(docRef) {
    console.log("Standard written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};

let data = {
  number: 1,
  title: "Course Overview and Introduction",
  description: "The overall design of the course is made clear to the learner at the beginning of the course.",
  annotation: "The course overview and introduction set the tone for the course, let learners know what to expect, and provide other guidance to help learners succeed from the outset."
};

db.collection("GeneralStandards").add(data)
.then(function(docRef) {  
  console.log("General Standard written with ID: ", docRef.id);
  addStandards1(docRef);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});