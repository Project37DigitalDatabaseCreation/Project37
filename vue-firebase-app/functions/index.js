const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createReviewer = functions.https.onCall((request) => {
  console.log(request)
  return admin.auth().createUser({
    email: request.email,
    password: request.password
    })
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message)
      });
  });
  
  
exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100)
    response.send(number.toString())
}) 

exports.sayHello = functions.https.onCall((data) => {
  return `project 37`;

});