<!--
* StandardCreateModal.vue
*
* Description: Provides a modal window to allow an admin user
* to edit a standard
-->

<template>
    <transition name="modal" style="font-size: .68em;
  font-family: Arial, Helvetica, sans-serif;">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            Add Standard
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Title</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        placeholder="Title" v-model="add.title" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Annotation</label>
                                <div class="col-md-6">
                                    <textarea class="form-control" value required
                                        placeholder="Annotation"
                                        v-model="add.annotation" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Description</label>
                                <div class="col-md-6">
                                    <textarea class="form-control" value required
                                        placeholder="Description"
                                        v-model="add.description" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">General
                                    Standard
                                    Number</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        v-model="add.number" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">Active</label>
                                <div class="col-md-6">
                                    <input type="checkbox" class="form-control" value
                                        required v-model="add.is_active" />
                                </div>
                            </div>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="btn save" @click="handleSubmit()">
                                Save General Standard
                            </button>
                            <button class="btn cancel" @click="$emit('close')">
                                Cancel
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { reactive } from 'vue'
import firebase from 'firebase'

export default {
    emits: ['close'],
    setup(props, { emit }) {
        var add = reactive({
            title: null,
            annotation: null,
            description: null,
            number: null,
            is_active: null
        })

        const handleSubmit = async () => {
            //  Create the document in firestore
            const resp = await firebase
                .firestore()
                .collection('GeneralStandards')
                .add(add)

            //  Get our document from firestore
            add = await firebase.firestore().doc(resp.path).get()
            add = add.data()

            //  Close the dialog
            emit('close', add)
        }

        return { add, handleSubmit }
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>