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
    <div class="form-group row">
      <label for="organization" class="col-md-4 col-form-label text-md-right">Organization</label>

      <div class="col-md-6">
          <select
          id="organization"
          class="form-control"
          name="organization"
          required
          v-model="selected_org"
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
          v-model="selected_proj"
          >
          <option v-for="project in projects" :value="project.id" :key="project.id">{{ project.data().title }}</option>                
          </select>
      </div>
    </div>
    <div>
      <button
        class="btn btn-primary"
        id="show-modal"
        :disabled="projectNewReviewEnabled == 0"
        @click="populatePopOut()">
          Add Review to Project
        </button>
    </div>
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
          <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
        </tr>
      </tbody>
    </table>    
    <!-- use the modal component, pass in the prop -->
    <modal
      v-if="showModal"
      v-on:edit-review="submitEdit"
      :selected_review="this.selected_review"
      :reviewers="this.reviewers"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import firebase from "firebase";
import modal from "@/components/EditProjectReview";

export default {
  name: "ProjectReviews",
  components: {
    modal
  },
  data() {
    return {
      showModal: false,
      projectSelectEnabled: 0,
      projectNewReviewEnabled: 0,
      organizations: [],
      projects: [],
      reviews: [],
      reviewers: [],
      selected_org: {},
      selected_proj: {},
      selected_review: {},
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
      var orgRef = firebase.firestore().doc("/Organizations/" + this.selected_org);

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
        var projectRef = firebase.firestore().doc("/Projects/" + this.selected_proj);
        
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
              
              this.projectNewReviewEnabled = 1;
      })}).catch(err => { console.error(err) });
    },
    populatePopOut(review) {
      if(review) {
        this.selected_review = review;
      } else {
        // pass an empty review object to hold the data
        this.selected_review = {
          reviewer: {}
        }
      }
      
      this.showModal = true;
    },
    submitEdit(review) {
      console.log("New Course Name: " + review.course_name);
      console.log("New Review ID: " + review.reviewer.id);
    }
  },
};
</script>