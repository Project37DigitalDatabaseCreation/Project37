import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getOrganizations = () => {

    const organizations = ref([])
    const error = ref(null)

    // Loads the contents of the Firebase Document 'Organizations' and fetches the document id for each into an array.
    const loadOrganizations = async () => {
        try {
            const res = await firebase.firestore().collection('Organizations').get()

            organizations.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
        }
    }

    return { organizations, error, loadOrganizations }
}

export default getOrganizations