<!--
* StandardCreateModal.vue
*
* Description: Provides a modal window to allow an admin user
* to edit a standard
-->

<template>
  <transition name="modal" style="font-size: 0.68em; font-family: Calibri">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Add Standard </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label
                  class="col-md-4 col-form-label text-md-right font-size: 1.1em"
                  >Title</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Title"
                    v-model="add.title"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  class="col-md-4 col-form-label text-md-right font-size: 1.1em"
                  >Annotation</label
                >
                <div class="col-md-6">
                  <textarea
                    class="form-control"
                    value
                    required
                    placeholder="Annotation"
                    v-model="add.annotation"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >General Standard
                </label>
                <div class="col-md-6">
                  <select
                    class="form-control"
                    required
                    v-model="add.general_standard_ref"
                    style="width: 100%; height: 40px; border-radius: 4px"
                  >
                    <option
                      v-for="gen in generalStandards"
                      v-bind:key="gen.id"
                      v-bind:value="gen.id"
                    >
                      {{ gen.number }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Standard Number</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    v-model="add.number"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Points</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    v-model="add.points"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Active</label
                >
                <div class="col-md-6">
                  <input
                    type="checkbox"
                    class="form-control"
                    value
                    required
                    v-model="add.is_active"
                  />
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit()">
                Save Standard
              </button>
              <button class="btn cancel" @click="$emit('close')">Cancel</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive } from "vue";
import firebase from "firebase";

export default {
  emits: ["close"],
  setup(props, { emit }) {
    var add = reactive({
      title: null,
      annotation: null,
      number: null,
      general_standard_ref: null,
      points: null,
      is_active: null,
    });

    const handleSubmit = async () => {
      //  Get general_standard doc ref
      const gen = firebase
        .firestore()
        .doc(`/GeneralStandards/${add.general_standard_ref}`);
      //  Replace general_standard_ref with the doc ref
      add.general_standard_ref = gen;

      //  Create the document in firestore
      const resp = await firebase.firestore().collection("Standards").add(add);

      //  Get our document from firestore
      add = await firebase.firestore().doc(resp.path).get();
      add = add.data();

      //  Now that it is inserted into the DB, parse our general standard for our list
      const genStd = await add.general_standard_ref.get();
      add.generalStandard = genStd.data();
      add.generalStandard.id = genStd.id;

      //  Close the dialog
      emit("close", add);
    };

    return { add, handleSubmit };
  },
  computed: {
    generalStandards() {
      return this.$store.getters.generalStandards;
    },
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>