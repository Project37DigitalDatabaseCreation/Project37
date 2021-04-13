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
                            Edit Standard
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
                                    class="col-md-4 col-form-label text-md-right">General
                                    Standard
                                </label>
                                <div class="col-md-6">
                                    <select class="form-control" required
                                        v-model="update.general_standard_ref"
                                        style="width:100%; height:40px; border-radius:4px;">
                                        <option v-for="gen in generalStandards"
                                            v-bind:key="gen.id" v-bind:value="gen.id">
                                            {{ gen.number }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">Standard
                                    Number</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        v-model="update.number" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                    class="col-md-4 col-form-label text-md-right">Points</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" value required
                                        v-model="update.points" />
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
                                Save Standard
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
                general_standard_ref: update.general_standard_ref,
                points: update.points,
                is_active: update.is_active,
                id: update.id
            }

            modifyDocument('Standards', update.id).updateDoc(modified)
        }

        return { update, handleSubmit }
    },
    mounted() {
        console.log('props', this.std)
    },
    computed: {
        generalStandards() {
            return this.$store.getters.generalStandards
        }
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>