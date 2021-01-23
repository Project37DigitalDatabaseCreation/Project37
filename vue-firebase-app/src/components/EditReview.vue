<!--
* Review.vue
*
* Description: Provides the necessary fields to allow a user
* to create and edit a Quality Matters review
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Review Setup</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
                <div class="form-group row">
                <label for="organization" class="col-md-4 col-form-label text-md-right">Organization</label>

                <div class="col-md-6">
                  <select
                    id="organization"
                    class="form-control"
                    name="organization"
                    required
                    v-model="form.organization"
                    v-on:change="populateProjects"
                  >
                    <option v-for="organization in organizations" :value="organization.id" :key="organization.id">{{ organization.data().title }}</option>                
                  </select>
                </div>
              </div>

                <div class="form-group row">
                <label for="project" class="col-md-4 col-form-label text-md-right">Project</label>

                <div class="col-md-6">
                  <select
                    id="project"
                    class="form-control"
                    name="project"
                    :disabled="projectSelectEnabled == 0"
                    required
                    v-model="form.project"
                  >
                    <option v-for="project in projects" :value="project.id" :key="project.id">{{ project.data().title }}</option>                
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="course_name" class="col-md-4 col-form-label text-md-right">Course Name</label>

                <div class="col-md-6">
                  <input
                    id="course_name"
                    type="text"
                    class="form-control"
                    name="course_name"
                    value
                    required
                    autofocus
                    v-model="form.course_name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="reviewer" class="col-md-4 col-form-label text-md-right">Reviewer</label>

                <div class="col-md-6">
                  <select
                    id="reviewer"
                    class="form-control"
                    name="reviewer"
                    required
                    v-model="form.reviewer"
                  >
                    <option v-for="reviewer in reviewers" :value="reviewer.id" :key="reviewer.id">
                      {{ reviewer.data().last_name + ", " + reviewer.data().first_name}}
                    </option>                
                  </select>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {},
      projectSelectEnabled: 0,
      organizations: [],
      projects: [],
      reviewers: [],
      error: null
    };
  },
  mounted() {
    // Get all of the organizations    
    firebase.firestore().collection("Organizations").orderBy("title", "asc").get()
    .then(result => {
      result.forEach(doc => {
        this.organizations.push(doc);
      })}).catch(err => { console.error(err) });

    // Get all of the reviewers
    firebase.firestore().collection("Reviewers").orderBy("last_name", "asc").get()
    .then(result => {
      result.forEach(doc => {
        this.reviewers.push(doc);
      })}).catch(err => { console.error(err) });
  },
  methods: {
    submit() {
      var navigate = this.$router;
      firebase.firestore().collection("Reviews").add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        course_name: this.form.course_name,
        reviewer_ref: firebase.firestore().doc('Reviewers/' + this.form.reviewer),
        project: firebase.firestore().doc('Projects/' + this.form.project),
        status: "In Progress"
        })
      .then(function() {
        console.log("Document successfully written!");
        navigate.replace({ name: "Dashboard" });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    populateProjects() {
      this.projects = [];      
  
      firebase.firestore().collection("Projects")
        .where("org_ref", "==", this.form.organization).get()
      .then(result => {
        result.forEach(doc => {            
          this.projects.push(doc);
          console.log(doc.data().title);
          this.projectSelectEnabled = 1;
      })}).catch(err => { console.error(err) });
    }
  }
};
</script>