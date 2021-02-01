<!--
* ClientEntry.vue
*
* Description: Provides the necessary fields to allow an admin user
* to create and edit a client for each organization
*
* the following fields: First Name, Last Name, Email, and Organization
*
* Organization is a drop down: relies on project being created.
-->
<template>
  <div class="card">
    <div class="card-header">
      <div class="row justify-content-start">
        <div class="col">
          <h4>Clients:</h4>
        </div>
        <div class="col-1">
          <button
            v-if="!showForm"
            @click="showForm = true"
            class="btn btn-primary btn-sm"
          >
            + Add
          </button>
          <button
            v-if="showForm"
            @click="showForm = false"
            class="btn btn-outline-primary btn-sm"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form v-if="showForm" @submit.prevent="handleSubmit">
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-md-right"
            >First Name</label
          >
          <div class="col-md-6">
            <input
              type="text"
              required
              placeholder="First Name"
              v-model="firstName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-md-right">Last Name</label>
          <div class="col-md-6">
            <input
              type="text"
              required
              placeholder="Last Name"
              v-model="lastName"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-md-right">Email</label>
          <div class="col-md-6">
            <input type="email" required placeholder="Email" v-model="email" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-md-right"
            >Organization</label
          >

          <div class="col-md-6">
            <select required v-model="organization">
              <option
                v-for="organization in organizations"
                v-bind:key="organization.title"
              >
                {{ organization.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group row mb-0">
          <div class="col-md-8 offset-md-4">
            <button class="btn btn-primary" type="submit">
              Add Client
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'
  import getOrganizations from '../composables/getOrganizations'
  import { ref } from 'vue'

  export default {
    setup() {
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const organization = ref('')
      const showForm = ref(false)

      const { organizations, error, loadOrganizations } = getOrganizations()

      // loads the current organizations from firebase for the dropdown menu
      loadOrganizations()

      // creates the client document in firebase on submitting the form
      const handleSubmit = async () => {
        const newClient = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          organization: organization.value,
        }

        const res = await firebase
          .firestore()
          .collection('Clients')
          .add(newClient)

        console.log(res)
      }

      return {
        organizations,
        error,
        handleSubmit,
        firstName,
        lastName,
        email,
        organization,
        showForm,
      }
    },
  }
</script>
