<!--
* ManageReviewers.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to manage reviewers in the system. 
* This is the main landing page to manage reviewers. It displays a table of 
* reviewers loaded from the Firestore "Reviewers"
*
-->

<template>
  <div class="container scrollcontainer">
    <div class="container-layout">
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
        <div class="table-responsive">
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
                    @click="showModifyReviewerModal(reviewer.id)"
                    class="btn edit"
                  ></button>
                </td>
                <td>
                  <button
                    @click="
                      showDeleteUserModal(
                        reviewer.first_name + ' ' + reviewer.last_name,
                        reviewer.email,
                        reviewer.id,
                        index
                      )
                    "
                    class="btn delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="paginationContainer">
      <p>
        <button class="btn" @click="prevPage">Previous</button>
        <button class="btn" @click="nextPage">Next</button>
      </p>
    </div> -->
      </div>
    </div>

    <!-- Modal that is loaded when the users clicks on the edit icon -->
    <modifyReviewerModal
      v-if="showEditReviewerModal"
      :passedReviewerId="this.id"
      v-on:update-clicked="refreshTable"
      @close="showEditReviewerModal = false"
    />

    <!-- Modal that is loaded when the users clicks on the Delete icon -->
    <deleteReviewerModal
      v-if="showDeleteReviewerModal"
      v-on:ok-click="deleteUserConfirmed"
      :passedMessage="
        this.deleteModalMessage1 +
        this.selectedReviewerName +
        this.deleteModalMessage2
      "
      :passedMessageTitle="this.modalMessageTitle"
      @close="showDeleteReviewerModal = false"
    />
  </div>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";
import modifyReviewerModal from "@/components/ModifyReviewerModal";
import deleteReviewerModal from "@/components/DeleteReviewerModal";

export default {
  components: {
    modifyReviewerModal,
    deleteReviewerModal,
  },
  data() {
    return {
      reviewerData: [], //Used to populate the table
      reviewer: {},
      showEditReviewerModal: false,
      showDeleteReviewerModal: false,
      id: "",
      selectedReviewerName: "", // Used to pass the name of the selected user to the delete modal
      selectedReviewerEmail: "",
      selectedReviewerID: "",
      selectedReviewerIndex: "",
      deleteModalMessage1: "Are you sure you want to delete the user ",
      deleteModalMessage2: "? This action cannot be undone",
      modalMessageTitle: "Are you sure?",
    };
  },
  methods: {
    AddReviewer() {
      this.$router.push({ name: "AddReviewer" });
    },

    refreshTable() {
      this.getReviewers();
    },

    //User clicked on the Delete icon
    showDeleteUserModal(name, email, id, index) {
      this.selectedReviewerName = name;
      this.selectedReviewerEmail = email;
      this.selectedReviewerID = id;
      this.selectedReviewerIndex = index;
      this.showDeleteReviewerModal = true;
    },

    //User confirmed they want to delete the user
    async deleteUserConfirmed() {
      //Get reference to cloud function to delete user
      const deleteReviewer_ref = firebase
        .functions()
        .httpsCallable("deleteReviewer");

      //Call cloud function to delete the reviewer from the Firebase *AUTH DB*
      await deleteReviewer_ref({
        uid: this.selectedReviewerID,
        email: this.selectedReviewerEmail,
      })
        .then(() => {
          //Delete reviewer from the *REVIEWERS COLLECTION*
          firebase
            .firestore()
            .collection("Reviewers")
            .doc(this.selectedReviewerID)
            .delete();

          //Remove the reviewer from the table array which causes the table to update
          this.reviewerData.splice(this.selectedReviewerIndex, 1);
        })
        .catch((err) => alert(err));
    },

    showModifyReviewerModal(id) {
      this.id = id;
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
        alert(err);
      }
    },
  },
  mounted() {
    this.getReviewers();
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>