import { ref, watchEffect } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getClients = () => {

    const clients = ref([])
    const error = ref(null)

    // Loads the contents of the Firebase Document 'Clients' and fetches the document id for each into an array.
    let loadClients = firebase.firestore()
        .collection('Clients')
        .orderBy("organization", "asc")

    const unsub = loadClients.onSnapshot(snap => {
        console.log(snap)
        let results = []
        snap.docs.forEach(doc => {
            results.push({ ...doc.data(), id: doc.id })
        });

        // update values
        clients.value = results
        error.value = null
    }, err => {
        console.log(err.message)
        clients.value = null
        error.value = 'could not fetch the data'
    })
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });
    return { clients, error }
}

export default getClients