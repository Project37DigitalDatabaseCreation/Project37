import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const getOrganizations = () => {

    const organizations = ref([])
    const error = ref(null)

    const load = async () => {
        try {
            const res = await firebase.firestore().collection('Organizations').get()

            organizations.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
        }
    }

    return { organizations, error, load }
}

export default getOrganizations