import { ref, watchEffect } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getDocument = (collection, id) => {

    let document = ref(null)
    let error = ref(null)

    // register the firestore collection reference
    let documentRef = firebase.firestore().collection(collection).doc(id)

    const unsub = documentRef.onSnapshot(doc => {
        // need to make sure the doc exists & has data
        // returns an array of data and it's id
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        }
        else {
            error.value = 'that document does not exist'
        }
    }, err => {
        console.log(err.message)
        error.value = 'problem fetching the document'
    })

    // unsubscribe to the real-time listener (they stack when you
    // navigate away if not unsubscribed)
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    });

    return { error, document }

}

export default getDocument