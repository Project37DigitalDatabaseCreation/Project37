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
          <option v-for="organization in organizations" :value="organization.id" :key="organization.id">{{ organization.title }}</option>                
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
          :disabled="!projectSelectEnabled"
          v-on:change="populateReviews"
          required
          v-model="selected_proj"
          >
          <option v-for="project in projects" :value="project.id" :key="project.id">{{ project.title }}</option>                
          </select>
      </div>
    </div>
    <div>
      <button
        class="btn btn-primary"
        id="show-modal"
        :disabled="!projectNewReviewEnabled"
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
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td>{{ review.course_name }}</td>
          <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName}}</td>
          <td>{{ review.status }}</td>
          <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
          <td><button class="btn btn-primary" @click="deleteReview(review)">Delete</button></td>
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
import { mapGetters } from 'vuex'

export default {
  name: "ProjectReviews",
  components: {
    modal
  },
  data() {
    return {
      showModal: false,
      // projectSelectEnabled: 0,
      // projectNewReviewEnabled: 0,
      // organizations: [],
      // projects: [],
      // reviews: [],
      // reviewers: [],
      selected_org: null,
      selected_proj: {},
      selected_review: {},
      error: null
    };
  },
  mounted() {
    // Get all of the organizations    
    this.$store.dispatch('fetchOrganizations')

    // Get all of the reviewers
    this.$store.dispatch('fetchReviewers')

    console.log('REVIEWS', this.reviews)
    console.log("ORGANIZATIONS", this.organizations)
  },
  computed: {
    ...mapGetters(['organizations','projects','reviews','reviewers']),
    projectNewReviewEnabled() {
      return this.reviews
    },
    projectSelectEnabled() {
      return this.projects
    }
  },
  methods: {
    populateProjects() {
      // this.projects = [];
      // this.reviews = [];
      // this.projectNewReviewEnabled = 0;
      var orgRef = firebase.firestore().doc("/Organizations/" + this.selected_org);    
      console.log('selected org', this.selected_org)
      
      //  Get our projects
      this.$store.dispatch('fetchProjects', orgRef)
    },
    populateReviews() {
        // this.reviews = [];
        // let reviews = this.reviews;
        var projectRef = firebase.firestore().doc("/Projects/" + this.selected_proj);
        // this.projectNewReviewEnabled = 1;

        this.$store.dispatch('fetchReviews', projectRef)
    },
    populatePopOut(review) {
      if(review) {
        // create a copy of the object to send to the popuout
        // so as to avoid the table showing the new values as
        // they are entered
        this.selected_review = Object.assign({}, review);
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

      let projectRef = firebase.firestore().doc("/Projects/" + this.selected_proj);
      let reviewerRef = firebase.firestore().doc("Reviewers/" + review.reviewer.id);
      let Vue = this;

      //var navigate = this.$router;
      if (!review.created) {
        review.created = firebase.firestore.FieldValue.serverTimestamp();
        review.status = "New";
      }        

      firebase.firestore().collection("Reviews").doc(review.id).set({
        created: review.created,
        course_name: review.course_name,
        reviewer_ref: reviewerRef,
        project: projectRef,
        status: review.status
        })
      .then(function() {
        Vue.populateReviews();
        //navigate.replace({ name: "Dashboard" });
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    deleteReview(review) {
      let Vue = this;
      let reviewId = review.id;

      if(confirm("Are you sure you want to delete this review?")) {
        firebase.firestore().collection("Reviews").doc(reviewId).delete().then(() => {
          console.log("Document successfully deleted!");
          Vue.populateReviews();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }      
    }
  },
};
</script>