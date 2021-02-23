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
  
  
exports.reviewsCounter = functions.database.ref('Reviews/{reviewId}')
    .onWrite(async (change, context) => {

        try {

            if (change.after.exists()) {
                if (change.before.exists()) {

                    const valObjBefore = change.before.val();
                    const valObjAfter = change.after.val();

                    const nbrReviewsBefore = Object.keys(valObjBefore).length;
                    const nbrReviewsAfter = Object.keys(valObjAfter).length;

                    if (nbrReviewsBefore !== nbrReviewsAfter) {

                        //We update the reviewCounter node
                        const reviewCounterRef = change.after.ref.parent.child('reviewsCounter');
                        await reviewCounterRef.transaction(() => {
                            return nbrReviewsAfter;
                        });
                        return null;

                    } else {
                        //No need to update the reviewsCounter node
                        return null;
                    }

                } else {                    
                    const reviewCounterRef = change.before.ref.parent.child('reviewsCounter');
                    await reviewCounterRef.transaction(() => {
                        return 1;
                    });
                    return null;
                }

            } else {
                const userJobsCounterRef = change.before.ref.parent.child('reviewsCounter');
                await userJobsCounterRef.transaction(() => {
                    return 0;
                });
                return null;
            }

        } catch (error) {
            console.log(error);
            return null;
        }

    });
