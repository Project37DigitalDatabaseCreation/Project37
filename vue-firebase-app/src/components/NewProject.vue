<!--
* Project.vue
*
* Description: Overview for New Project Landing Page:
* allows the user to create a new project
*
-->

<template>
    <!-- Form to input new Project -->
    <div class="container">
    <div style="position:fixed; left:200px; width:90%;">
    <div class="justify-content-center">
      <div class="col-md-10" style="padding:0 !important;">
        <div class="card">
          <div class="card-header text-center">New Project</div>
            <div class="card-body">
                <div v-if="error" class="alert alert-danger">{{error}}</div>
                <!-- Input fields for form -->
                <form action="#" @submit.prevent="submit">
                    <!-- Title label and textbox -->
                    <div class="form-group row">
                        <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>
                          <div class="col-md-8">
                            <input id="title" type="text" class="form-control" name="title" value required v-model="form.title" />
                          </div>
                    </div>
                    <!-- Organization label and dropdown menu -->
                    <div class="form-check row">
                        <label for="organization" class="col-md-4 col-form-label text-md-right">Organization</label>
                          <select>
                          <option v-for="organization in organizations" :key="organization.key"> {{organization.title}}</option>
                          </select>
                    </div>
                    <!-- Clients label and dropdown menu -->
                    <div class="form-check row">
                        <label for="client" class="col-md-4 col-form-label text-md-right">Clients</label>
                          <select>
                          <option v-for="client in clients" :key="client.key"> {{client.title}}</option>
                          </select>
                    </div>
                    <!-- Description label and textbox -->
                    <div class="form-group row">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                          <div class="col-md-8">
                            <input id="title" type="text" class="form-control" name="title" value required v-model="form.description" />
                          </div>
                    </div>
                    <!-- Submit new project -->
                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-4">
                          <button type="submit" class="btn btn-primary">Create New Project</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import firebase from 'firebase'

export default {
  data() {
    return {
      organizations: [],
      clients: [],
      form: {
            title: "",
            organization: "",
            description: "",
            client: ""
          },
        error: null
    };
  },
  methods: {
    readOrganizations() {
      let organizations = [];
      firebase.firestore().collection("Organizations")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           this.organizations.push({
              title: doc.data().title,
            });
          });
          return organizations
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
    readClients() {
      let clients = [];
      firebase.firestore().collection("Clients")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           this.clients.push({
              title: doc.data().name,
            });
          });
          return clients
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
  },
  mounted() {
    this.readOrganizations(),
    this.readClients();
  },
  //finish submit logic for database to save new project
};
</script>