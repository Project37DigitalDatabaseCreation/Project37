<!--
* ProjectReviews.vue
*
* Description: Provides a user with admin priveleges the ability
* to View, Create, Delete and Update the reviews for a specific
* project.
*
-->
<template>
  <div class="container scrollcontainer">
    <div class="card" style="margin-right: 15px">
      <div class="card-header">Project Reviews</div>
      <div class="card-body">
        <span style="color: red">{{ error }}</span>

        <div class="form-group row">
          <label
            for="organization"
            class="col-md-4 col-form-label text-md-right"
            >Organization</label
          >
          <div class="col-md-6">
            <select
              id="organization"
              class="form-control"
              name="organization"
              required
              v-model="selected_org"
              v-on:change="populateProjects"
            >
              <option
                v-for="organization in organizations"
                :value="organization.id"
                :key="organization.id"
              >
                {{ organization.data().title }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label for="project" class="col-md-4 col-form-label text-md-right"
            >Project</label
          >
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
              <option
                v-for="project in projects"
                :value="project.id"
                :key="project.id"
              >
                {{ project.data().title }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button
            class="btn save"
            id="show-modal"
            :disabled="projectNewReviewEnabled == 0"
            @click="populatePopOut()"
          >
            Add Review To Project
          </button>
        </div>
        <div class="table-responsive" style="margin-top: 15px">
        <table class="table">
          <thead class="project-head">
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Reviewer</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody class="project-body">
            <tr v-for="review in reviews" :key="review.id">
              <td>{{ review.course_name }}</td>
              <td>{{ review.course_code }}</td>
              <td>
                {{
                  review.reviewer.lastName + ", " + review.reviewer.firstName
                }}
              </td>
              <td>{{ review.status }}</td>
              <td>
                <button
                  title="edit"
                  class="btn edit"
                  @click="populatePopOut(review)"
                ></button>
              </td>
              <td>
                <button
                  title="delete"
                  class="btn delete"
                  @click="deleteReview(review)"
                ></button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        <!-- use the modal component, pass in the prop -->
        <modal
          v-if="showModal"
          v-on:edit-review="submitEdit"
          :selected_review="this.selected_review"
          :reviewers="this.reviewers"
          @close="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import modal from "@/components/EditProjectReview";

export default {
  name: "ProjectReviews",
  components: {
    modal,
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
      error: null,
    };
  },
  mounted() {
    // Get all of the organizations
    firebase
      .firestore()
      .collection("Organizations")
      .orderBy("title", "asc")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          this.organizations.push(doc);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // Get all of the reviewers
    firebase
      .firestore()
      .collection("Reviewers")
      .orderBy("lastName", "asc")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          this.reviewers.push(doc);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    populateProjects() {
      this.projects = [];
      this.reviews = [];
      this.projectNewReviewEnabled = 0;
      var orgRef = firebase
        .firestore()
        .doc("/Organizations/" + this.selected_org);

      firebase
        .firestore()
        .collection("Projects")
        .where("org_ref", "==", orgRef)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            this.projects.push(doc);
            this.projectSelectEnabled = 1;
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    populateReviews() {
      this.reviews = [];
      let reviews = this.reviews;
      var projectRef = firebase
        .firestore()
        .doc("/Projects/" + this.selected_proj);
      this.projectNewReviewEnabled = 1;

      firebase
        .firestore()
        .collection("Reviews")
        .where("project_ref", "==", projectRef)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            let review = doc.data();
            review.id = doc.id;

            if (review.reviewer_ref) {
              review.reviewer_ref
                .get()
                .then((rDoc) => {
                  review.reviewer = rDoc.data();
                  review.reviewer.id = rDoc.id;
                  reviews.push(review);
                })
                .catch((err) => console.error(err));
            } else {
              reviews.push(review);
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    populatePopOut(review) {
      if (review) {
        // create a copy of the object to send to the popuout
        // so as to avoid the table showing the new values as
        // they are entered
        this.selected_review = Object.assign({}, review);
      } else {
        // pass an empty review object to hold the data
        this.selected_review = {
          reviewer: {},
        };
      }

      this.showModal = true;
    },
    submitEdit(review) {
      let projectRef = firebase
        .firestore()
        .doc("/Projects/" + this.selected_proj);
      let reviewerRef = firebase
        .firestore()
        .doc("Reviewers/" + review.reviewer.id);
      let Vue = this;
      let ts = firebase.firestore.FieldValue.serverTimestamp();
      Vue.error = null;

      if (!review.created) {
        review.created = ts;

        firebase
          .firestore()
          .collection("Projects")
          .doc(this.selected_proj)
          .update({
            num_reviews: firebase.firestore.FieldValue.increment(1),
          })
          .then(function () {})
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }

      firebase
        .firestore()
        .collection("Projects")
        .doc(this.selected_proj)
        .update({
          reviewer_ref: firebase
            .firestore()
            .doc("Reviewers/" + review.reviewer.id),
        })
        .then(function () {})
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      firebase
        .firestore()
        .collection("Reviews")
        .doc(review.id)
        .set({
          created: review.created,
          modified: ts,
          course_name: review.course_name,
          course_code: review.course_code,
          reviewer_ref: reviewerRef,
          project_ref: projectRef,
          status: review.status,
        })
        .then(function () {
          Vue.populateReviews();
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    deleteReview(review) {
      let Vue = this;
      let reviewId = review.id;

      if (confirm("Are you sure you want to delete this review?")) {
        let reviewRef = firebase.firestore().doc("/Reviews/" + reviewId);

        firebase
          .firestore()
          .collection("Scores")
          .where("review_ref", "==", reviewRef)
          .get()
          .then((result) => {
            if (result.size > 0) {
              Vue.error =
                "The selected review cannot be deleted because there are course ratings associated with it.";
            } else {
              firebase
                .firestore()
                .collection("Reviews")
                .doc(reviewId)
                .delete()
                .then(() => {
                  Vue.populateReviews();
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });

              firebase
                .firestore()
                .collection("Projects")
                .doc(this.selected_proj)
                .update({
                  num_reviews: firebase.firestore.FieldValue.increment(-1),
                  reviewer_ref: null,
                })
                .then(function () {})
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>