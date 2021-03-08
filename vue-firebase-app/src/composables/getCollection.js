import { ref, watchEffect } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getCollection = (collection, query) => {

    const documents = ref([])
    const error = ref(null)

    // Loads the contents of the Firebase Collection passed as the first argument
    let collectionRef = firebase.firestore().collection(collection)


    // If a second parameter of query is included then it will use reference the query
    // pass the query as an array i.e. ['organization.id', '==', 'organization.value.id']
    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    // subscribe to the real-time listener to update on any change
    const unsub = collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id })
        });

        // update values
        documents.value = results
        error.value = null
    }, err => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch the data'
    })

    // unsubscribe to the real-time listener (they stack when you
    // navigate away if not unsubscribed)
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    return { error, documents }
}

export default getCollection
