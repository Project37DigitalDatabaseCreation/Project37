import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

const modifyDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    let docReference = firebase.firestore().collection(collection).doc(id)

    const deleteDoc = async () => {
        error.value = null
        // isPending = true

        try {
            const res = await docReference.delete()
            // isPending = false
            return res
        } catch (err) {
            console.log(err.message)
            // isPending = false
            error.value = 'could not delete document'
        }
    }

    return { error, isPending, deleteDoc }
}

export default modifyDocument