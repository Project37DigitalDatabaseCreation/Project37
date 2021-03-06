import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

// pass collection document belongs to and it's id to modify/delete
const modifyDocument = (collection, id) => {
    const error = ref(null)

    let docReference = firebase.firestore().collection(collection).doc(id)

    const deleteDoc = async () => {
        error.value = null

        try {
            const res = await docReference.delete()
            return res
        } catch (err) {
            console.log(err.message)

            error.value = 'could not delete document'
        }
    }

    const updateDoc = async (updates) => {
        error.value = null

        try {
            const res = await docReference.update(updates)
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'could not update document'
        }
    }
    return { error, deleteDoc, updateDoc }
}

export default modifyDocument