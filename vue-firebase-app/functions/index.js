const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();




// Function Author: Ben McElyea 
// Date: February 2021
// createReviewer - A Cloud function to add users to the Firebase authentication DB 
// To update this function you must run the command firebase deploy --only functions 

exports.createReviewer = functions.https.onCall((request, context) => {
  console.log(request.email)

  //Only allow authenticated users to call this function. 
  if (!context.auth) {
    return { message: 'Authentication Required!', code: 401 };
  }
  return admin.auth().createUser({
    email: request.email,
    password: request.password
    })
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message)
      });
  });
  
  
