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
  <div class="container scrollcontainer">
    <div class="container-layout">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header">
            Reviewers
            <div style="float: right">
              <button
                type="button"
                class="btn btn-sm"
                @click.prevent="AddReviewer"
                style="float: right margin-right:4px; background-color:  #49703b;"
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
                  <button @click="showModifyReviewerModal()" class="btn edit">
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

    <modifyReviewerModal
      v-if="showEditReviewerModal"
      @close="showEditReviewerModal = false"
    />
  </div>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";
import modifyReviewerModal from "@/components/ModifyReviewerModal";

export default {
  components: {
    modifyReviewerModal,
  },
  data() {
    return {
      reviewerData: [],
      reviewer: {},
      showEditReviewerModal: false,
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

    showModifyReviewerModal() {
      // this.$router.push({
      //   name: "ModifyReviewer",
      //   params: { passedReviewerId: reviewerId },
      // });
      this.showEditReviewerModal = true;
    },

    async getReviewers() {
      this.reviewerData = [];

      try {
        const querySnapshot = await firebase
          .firestore()
          .collection("Reviewers")
          .get();

        querySnapshot.forEach((doc) => {
          this.reviewerData.push({
            email: doc.data().email,
            first_name: doc.data().firstName,
            last_name: doc.data().lastName,
            is_admin: doc.data().isAdmin,
            id: doc.id,
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    // console.log("In mount");
    this.getReviewers();
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>