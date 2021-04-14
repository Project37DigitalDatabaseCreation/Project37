<!--
* ClientModal.vue
*
* Description: Provides a modal window to allow an admin user
* to create a client
*
* the following fields: First Name, Last Name, Email, and Organization
*
* Organization is a drop down: relies on project being created.
-->

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Add Client </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="First Name"
                    v-model="firstName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Last Name"
                    v-model="lastName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >
                <div class="col-md-6">
                  <input
                    type="email"
                    class="form-control"
                    value
                    required
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >
                <div class="col-md-6">
                  <select class="form-control" required v-model="organization">
                    <option
                      v-for="organization in organizations"
                      v-bind:key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit(), $emit('close')">
                Add Client
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
import firebase from "firebase";
import "firebase/firestore";
import { ref } from "vue";
import getCollection from "../composables/getCollection";

export default {
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const organization = ref("");

    const { documents: organizations, error } = getCollection("Organizations");

    // creates the client document in firebase
    const handleSubmit = async () => {
      const newClient = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        organization: organization.value,
      };

      await firebase.firestore().collection("Clients").add(newClient);
    };

    return {
      organizations,
      error,
      handleSubmit,
      firstName,
      lastName,
      email,
      organization,
    };
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>
