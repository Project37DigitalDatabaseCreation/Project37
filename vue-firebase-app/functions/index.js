const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.reviewStatusCounter = functions.firestore.document('Reviews/{reviewId}')
    .onWrite((change, context) => {
        try {            
            if(change.after.exists && change.before.exists) {
                console.log("Hello world!");
                // the review has been updated, check if status changed
                let reviewBefore = change.before.data();
                let reviewAfter = change.after.data();

                reviewBefore.id = change.before.id;
                reviewAfter.id = change.after.id;

                if(reviewBefore.status !== reviewAfter.status) {
                    console.log("Review " + reviewBefore.id + " had a status of " + 
                    reviewBefore.status + " but then was changed to " + reviewAfter.status + "!");

                    return db.collection("Stats").doc("ReviewsByStatus").set({
                            new: 1,
                            not_new: 0
                        }
                    )
                } else {
                    return null;
                }
            } else {
                return null;
            }

            /*if (change.after.exists()) {
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
            }*/

        } catch (error) {
            console.log(error);
            return null;
        }
    });