const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();




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
  
  
exports.reviewStatusCounter = functions.firestore.document('Reviews/{reviewId}')
    .onWrite((change, context) => {
        console.log("Before: " + change.before.exists);
        console.log("After: " + change.after.exists);
        try {       
            const col = db.collection("Stats");
            const doc = db.doc('Stats/ReviewsByStatus');
            const arrayUnion = admin.firestore.FieldValue.arrayUnion;
            const arrayRemove = admin.firestore.FieldValue.arrayRemove;
                         
            if(change.after.exists && change.before.exists) {
                // the review has been updated, check if status changed
                let reviewBefore = change.before.data();
                let reviewAfter = change.after.data();

                reviewBefore.id = change.before.id;
                reviewAfter.id = change.after.id;

                if(reviewBefore.status !== reviewAfter.status) {                
                    if(reviewBefore.status == "New" && reviewAfter.status == "In-Progress") {
                        col.where("NewReviews", "array-contains", reviewBefore.id).get()
                        .then(result => {
                            if (result.size > 0) {
                                return doc.update({
                                    NewReviews: arrayRemove(reviewBefore.id),
                                    InProgressReviews: arrayUnion(reviewBefore.id)
                                });
                            } else {
                                return null;
                            }
                        });
                    }

                    if(reviewBefore.status == "In-Progress" && reviewAfter.status == "Complete") {
                        col.where("InProgressReviews", "array-contains", reviewBefore.id).get()
                        .then(result => {
                            if(result.size > 0) {
                                return doc.update({
                                    InProgressReviews: arrayRemove(reviewBefore.id),
                                    CompleteReviews: arrayUnion(reviewBefore.id)
                                });
                            } else {
                                return null;
                            }
                        });
                    }
                } else {
                    return null;
                }
            } else if(change.after.exists && !change.before.exists) {
                let reviewAfter = change.after.data();
                let docId = change.after.id;

                if(reviewAfter.status == "New") {
                    col.where("NewReviews", "array-contains", docId).get()
                    .then(result => {
                        if(result.size == 0) {
                            return doc.set({
                                NewReviews: arrayUnion(docId)
                            });
                        } else {
                            return null;
                        }
                    });
                }                
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    });
