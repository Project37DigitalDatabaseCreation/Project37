<!--
* ProjectReviews.vue
*
* Description: Provides a user with admin priveleges the ability
* to View, Create, Delete and Update the reviews for a specific
* project.
*
-->
<template>
  <div class="container">
    <h1 class="mt-4 text-center">Project Reviews</h1>
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
            v-on:change="populateReviews"
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
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">Reviewer</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td>{{ review.course_name }}</td>
          <td>{{ review.reviewer.last_name + ", " + review.reviewer.first_name}}</td>
          <td>{{ review.status }}</td>
        </tr>
      </tbody>
    </table>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
  <modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import firebase from "firebase";
import modal from "@/components/Modal";

export default {
  name: "ProjectReviews",
  components: {
    modal
  },
  data() {
    return {
      showModal: false,
      form: {},
      projectSelectEnabled: 0,
      organizations: [],
      projects: [],
      reviews: [],
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
      var orgRef = firebase.firestore().doc("/Organizations/" + this.form.organization);

      firebase.firestore().collection("Projects")
      .where("org_ref", "==", orgRef).get()
      .then(result => {
        result.forEach(doc => {            
          this.projects.push(doc);
          this.projectSelectEnabled = 1;
      })}).catch(err => { console.error(err) });
    },
    populateReviews() {
        this.reviews = [];
        let reviews = this.reviews;
        var projectRef = firebase.firestore().doc("/Projects/" + this.form.project);
        
        firebase.firestore().collection("Reviews")
        .where("project", "==", projectRef).get()
        .then(result => {
            result.forEach(doc => {
              let review = doc.data();
              review.id = doc.id;

              if(review.reviewer_ref) {
                review.reviewer_ref.get()
                .then(rDoc => {
                  review.reviewer = rDoc.data();
                  review.reviewer.id = rDoc.id;
                  reviews.push(review);
                })
                .catch(err => console.error(err));
              } else {
                reviews.push(review);
              }              
      })}).catch(err => { console.error(err) });
    }
  },
};
</script>