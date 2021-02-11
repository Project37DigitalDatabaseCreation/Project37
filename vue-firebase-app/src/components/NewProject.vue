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
                <form ref="OrgForm" action="#" @submit.prevent="submit">

                    <!-- Title label and textbox -->
                    <div class="form-group row">
                        <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>
                          <div class="col-md-8">
                            <input id="title" type="text" class="form-control" name="title" value required v-model="form.title" />
                          </div>
                    </div>

                    <!-- Organization label and dropdown menu -->
                    <div class="form-group row">
                        <label for="organization" class="col-md-4 col-form-label text-md-right">Organization</label>
                          <div class="col-md-8">
                          <select id="organization" class="form-control" name="organization" required v-model="form.organization" v-on:change="readClients">
                            <option disabled selected value="default"> Select Organization </option>
                            <option v-for="organization in organizations" :value="organization.title" :key="organization.key"> {{organization.title}}</option>
                          </select>
                          </div>
                    </div>

                    <!-- Clients label and dropdown menu -->
                    <div class="form-group row">
                        <label for="client" class="col-md-4 col-form-label text-md-right">Clients</label>
                          <div class="col-md-8">
                          <select multiple id="clients" class="form-control" name="clients" required v-model="form.clients" v-on:change="getOrganizationId">
                            <option v-for="client in clients" :value="client.firstName" :key="client.key"> {{client.firstName}}</option>
                          </select>
                          </div>
                    </div>

                    <!-- Description label and textbox -->
                    <div class="form-group row">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                          <div class="col-md-8">
                            <input id="description" type="text" class="form-control" name="description" value required v-model="form.description" />
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
var submission = false
import firebase from 'firebase'
export default {
  data() {
    return {
      organizations: [],
      updateOrganizationId: [],
      clients: [],
      form: {
            title: "",
            organization: "",
            description: "",
            client: "",
            org_ref: ""
          },
        error: null
    };
  },
  methods: {
    submit() {
     submission = true
      var navigate = this.$router;
      firebase.firestore().collection("Projects").add({
        description: this.form.description,
        num_reviews: 0,
        org_ref: this.form.org_ref,
        organization: this.form.organization,
        status: "In Progress",
        title: this.form.title,
        clients: this.form.clients
        })
      .then(function() {
        navigate.replace({ name: "NewProject" });
        if (submission){
          alert("New Project added successfully!")
        }
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
      this.form.organization = "default"
      this.form.client = "default"
      this.form.title = ""
      this.form.description = ""
    },
    readOrganizations() {
      let organizations = [];
      firebase.firestore().collection("Organizations")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           this.organizations.push({
              id: doc.id,
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
      this.clients = [];
      firebase.firestore().collection("Clients")
        .where("organization", "==", this.form.organization).get()
        .then((result) => {
          result.forEach((doc) => {
           this.clients.push({
              id: doc.id,
              email: doc.data().email,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              organization: doc.data().organization,
            });
          });
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
    getOrganizationId() {
      let updateOrganizationId = [];
      firebase.firestore().collection("Organizations")
        .where("title", "==", this.form.organization).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           this.updateOrganizationId.push({
              id: doc.id,
              title: doc.data().title,
            });
            this.form.org_ref = doc.id
          });
          return updateOrganizationId
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
};
</script>