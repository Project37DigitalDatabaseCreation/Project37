const functions = require('firebase-functions');
import admin from 'firebase-admin';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const createReviewer = functions.https.onCall((reviewer) => {
    return admin.auth().createUser(reviewer)
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message)
      });
  });
  
  export default createUser;
  
