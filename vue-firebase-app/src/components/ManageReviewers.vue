<!--
* AddReviewer.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to manage reviewers in the system. 
* This is the main landing page to manage reviewers
*
*
* This component is the parent of the ReviewerList.vue component. 
*
-->

<template>
  <div class="container">
    <router-view></router-view>
    <div class="container-layout">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header">
            Reviewers
            <div style="float: right">
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="AddReviewer"
                style="float: right"
              >
                + Add Reviewer
              </button>
            </div>
          </div>
          <table class="table">
            <thead class="project-head">
              <tr>
                <th>Name</th>
                <th>Email Address</th>
                <th>Administrator</th>
                <th></th>
                <th></th>
                <!-- <th>Last Login</th> -->
              </tr>
            </thead>
            <tbody class="project-body">
              <tr v-for="(reviewer, index) in reviewerData" :key="index">
                <td>{{ reviewer.first_name + " " + reviewer.last_name }}</td>
                <td>{{ reviewer.email }}</td>
                <td>{{ reviewer.is_admin === true ? "Yes" : "No" }}</td>
                <td>
                  <button
                    @click="modifyReviewer(reviewer.id), (showEditModal = true)"
                    class="btn edit"
                  >
                    Modify
                  </button>
                </td>
                <td>
                  <button @click="handleDelete(reviewer.id)" class="btn delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="paginationContainer">
      <p>
        <button class="btn" @click="prevPage">Previous</button>
        <button class="btn" @click="nextPage">Next</button>
      </p>
    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      reviewerData: [],
      reviewer: {},
    };
  },
  methods: {
    AddReviewer() {
      this.$router.push({ name: "AddReviewer" });
    },

    prevPage() {
      alert("TODO - previous page");
    },
    nextPage() {
      alert("TODO - next page");
    },
    handleDelete(reviewerId) {
      alert("todo " + reviewerId);
    },

    modifyReviewer(reviewerId) {
      this.$router.push({
        name: "ModifyReviewer",
        params: { passedReviewerId: reviewerId },
      });
    },

    getReviewers() {
      this.reviewerData = [];
      firebase
        .firestore()
        .collection("Reviewers")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.reviewerData.push({
              email: doc.data().email,
              first_name: doc.data().firstName,
              last_name: doc.data().lastName,
              is_admin: doc.data().isAdmin,
              id: doc.id,
            });
            // console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          alert("Error in ReviewerList.vue : ", error);
        });
    },
  },
  mounted() {
    // console.log("In mount");
    this.getReviewers();
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>