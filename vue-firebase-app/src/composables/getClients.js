import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getClients = () => {

    const clients = ref([])
    const error = ref(null)

    // Loads the contents of the Firebase Document 'Clients' and fetches the document id for each into an array.
    const loadClients = async () => {
        try {
            const res = await firebase.firestore().collection('Clients').get()

            clients.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
        }
    }

    return { clients, error, loadClients }
}

export default getClients