const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Function Author: Ben McElyea 
// Date: February 2021
// createReviewer - A Cloud function to add users to the Firebase authentication DB 
// To update this function you must run the command firebase deploy --only functions 

exports.createReviewer = functions.https.onCall((request, context) => {
    console.log(request.email)  //Only allow authenticated users to call this function. 
    if (!context.auth) {
      return { message: 'Authentication Required!', code: 401 };
    } else {    return admin.auth().createUser({
        email: request.email,
        password: request.password
    })
    .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message)
    });
}});


// Function Author: Ben McElyea
// Date: February 2021
// deleteReviewer - A Cloud function to delete users to the Firebase authentication DB 
// To update this function you must run the command firebase deploy --only functions 

exports.deleteReviewer = functions.https.onCall((request, context) => {
  console.log("Deleting user" + request.email)

  //Only allow authenticated users to call this function. 
  if (!context.auth) {
    return { message: 'Authentication Required!', code: 401 };
  }
  else {

    return admin.auth().deleteUser(request.uid)
      .catch((error) => {
        console.log('Error deleting user:', error);
        throw new functions.https.HttpsError('internal', error.message)
      });

  }


});


const db = admin.firestore();

exports.reviewCreateStatusCounter = functions.firestore.document('Reviews/{reviewId}')
    .onCreate(async (snap, context) => {
        try {       
            const col = db.collection("Stats");
            const doc = db.doc('Stats/ReviewsByStatus');
            const arrayUnion = admin.firestore.FieldValue.arrayUnion;
            const increment = admin.firestore.FieldValue.increment(1);

            let newReview = snap.data();
            let docId = snap.id;
                
            // handle a new review
            if(newReview.status === "New") {
                let result = await col.where("NewReviews", "array-contains", docId).get();
                    
                if(result.size === 0) {
                    return doc.set({
                        NewReviewsCount: increment,
                        NewReviews: arrayUnion(docId)
                    },
                    {
                        merge: true
                    });
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

exports.reviewUpdateStatusCounter = functions.firestore.document('Reviews/{reviewId}')
    .onUpdate(async (change, context) => {
        try {       
            const col = db.collection("Stats");
            const doc = db.doc('Stats/ReviewsByStatus');
            const arrayUnion = admin.firestore.FieldValue.arrayUnion;
            const arrayRemove = admin.firestore.FieldValue.arrayRemove;
            const increment = admin.firestore.FieldValue.increment(1);
            const decrement = admin.firestore.FieldValue.increment(-1);
                         
            // the review has been updated, check if status changed
            let reviewBefore = change.before.data();
            let reviewAfter = change.after.data();

            reviewBefore.id = change.before.id;
            reviewAfter.id = change.after.id;
            
            if(reviewBefore.status !== reviewAfter.status) {  
                // handle review going from New to In-Progress              
                if(reviewBefore.status === "New" && reviewAfter.status === "In-Progress") {
                    let result = await col.where("NewReviews", "array-contains", reviewBefore.id).get();

                    if (result.size > 0) {
                        return doc.set({
                            NewReviewsCount: decrement,
                            InProgressReviewsCount: increment,                                                                    
                            NewReviews: arrayRemove(reviewBefore.id),
                            InProgressReviews: arrayUnion(reviewBefore.id)
                        },
                        {
                            merge: true
                        });                                
                    } else {
                        return null;
                    }
                }

                // handle review going from In-Progress to Complete
                if(reviewBefore.status === "In-Progress" && reviewAfter.status === "Complete") {
                    let result = await col.where("InProgressReviews", "array-contains", reviewBefore.id).get();

                    if(result.size > 0) {
                        doc.set({
                            InProgressReviewsCount: decrement,
                            CompletedReviewsCount: increment,
                            InProgressReviews: arrayRemove(reviewBefore.id),
                            CompletedReviews: arrayUnion(reviewBefore.id)
                        },
                        {
                            merge: true
                        });
                    } else {
                        return null;
                    }
                }

                return null;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

exports.reviewDeleteStatusCounter = functions.firestore.document('Reviews/{reviewId}')
    .onDelete(async (snap, context) => {
        try {       
            const col = db.collection("Stats");
            const doc = db.doc('Stats/ReviewsByStatus');
            const arrayRemove = admin.firestore.FieldValue.arrayRemove;
            const decrement = admin.firestore.FieldValue.increment(-1);
                         
            // a review must have been deleted
            let deletedReview = snap.data();
            let docId = snap.id;

            // each possible status needs to be handled
            if(deletedReview.status === "New") {          
                let result = await col.where("NewReviews", "array-contains", docId).get();

                if(result.size > 0) {
                    return doc.set({
                        NewReviewsCount: decrement,
                        NewReviews: arrayRemove(docId)
                    },
                    {
                        merge: true
                    });
                } else {
                    return null;
                }
            } else if(deletedReview.status === "In-Progress") {
                let result = await col.where("InProgressReviews", "array-contains", docId).get();
                                        
                if(result.size > 0) {
                    return doc.set({
                        InProgressReviewsCount: decrement,
                        InProgressReviews: arrayRemove(docId)
                    },
                    {
                        merge: true
                    });
                } else {
                    return null;
                }                  
            } else {
                let result = await col.where("CompletedReviews", "array-contains", docId).get();

                if(result.size > 0) {
                    return doc.set({
                        CompletedReviewsCount: decrement,
                        CompletedReviews: arrayRemove(docId)
                    },
                    {
                        merge: true
                    });
                }
                else {
                    return null;
                }             
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);