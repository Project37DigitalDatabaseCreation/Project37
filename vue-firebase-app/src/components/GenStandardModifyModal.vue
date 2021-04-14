<!--
* StandardModifyModal.vue
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
                            Edit General Standard
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Title</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        placeholder="Title" v-model="update.title" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Annotation</label>
                                <div class="col-md-6">
                                    <textarea class="form-control" value required
                                        placeholder="Annotation"
                                        v-model="update.annotation" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right font-size: 1.1em">Description</label>
                                <div class="col-md-6">
                                    <textarea class="form-control" value required
                                        placeholder="Description"
                                        v-model="update.description" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">General
                                    Standard
                                    Number</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        v-model="update.number" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">Active</label>
                                <div class="col-md-6">
                                    <input type="checkbox" class="form-control" value
                                        required v-model="update.is_active" />
                                </div>
                            </div>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="btn save"
                                @click="handleSubmit(), $emit('close', update)">
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
import modifyDocument from '../composables/modifyDocument'

export default {
    emits: ['close'],
    props: ['std'],
    setup(props) {
        const update = reactive({ ...props.std })

        const handleSubmit = async () => {
            const modified = {
                title: update.title,
                number: update.number,
                is_active: update.is_active,
                annotation: update.annotation,
                description: update.description,
                id: update.id
            }

            modifyDocument('GeneralStandards', update.id).updateDoc(modified)
        }

        return { update, handleSubmit }
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>