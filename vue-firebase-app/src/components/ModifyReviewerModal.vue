<!--
* ModifyReviewer.vue
*
* Author: Ben McElyea
* Date: February 2021
*
* Description: Component to modify existing reviewers. 
* Contains the fields First Name, Last Name and email address and a checkbox
* that designates if the user is an administrator
*
-->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Modify Reviewer </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="First Name"
                    v-model="firstName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Last Name"
                    v-model="lastName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >
                <div class="col-md-6">
                  <input
                    type="email"
                    class="form-control"
                    value
                    required
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >
                <div class="col-md-6">
                  <select class="form-control" required v-model="organization">
                    <option
                      v-for="organization in organizations"
                      v-bind:key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit(), $emit('close')">
                Add Client
              </button>
              <button class="btn cancel" @click="$emit('close')">Cancel</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";
// import modal from "@/components/DeleteReviewerModal";

export default {
  components: {
    // modal,
  },
  emits: ["ok-click", "close"],
  props: {
    // The Firestore doc id of the reviewer is passed into this prop
    // when the user is clicked on in the ReviewerList.vue table
    passedReviewerId: {
      type: String, //The Firestore doc id of the reviewer
    },
  },
  data() {
    return {
      form: {
        fname: "",
        lname: "",
        email: "",
        isAdmin: "",
      },
      showModal: false,
      error: null,
      modalMessage: "Are you sure you want to delete the user ",
      modalMessageTitle: "Are you sure?",
    };
  },

  methods: {
    //Method to modify a existing user
    async updateClicked() {
      // console.log("Update clicked");
      let isAdminSet = this.form.isAdmin === "true";
      let modifiedUser = {
        firstName: this.form.fname,
        lastName: this.form.lname,
        email: this.form.email,
        isAdmin: isAdminSet,
      };

      await firebase
        .firestore()
        .collection("Reviewers")
        .doc(this.passedReviewerId)
        .set(modifiedUser);
      // console.log(modifiedUser);
      this.returnToPreviousScreen();
    },

    //Returns to the previous screen/view
    returnToPreviousScreen() {
      this.$router.push({ path: "/managereviewers" });
    },

    //This method reads the reviewer from the Firebase Firestore DB and
    // and loads the data into the form.
    async getReviewer() {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("Reviewers")
          .doc(this.passedReviewerId)
          .get();

        const reviewer = snapshot.data();
        this.form.fname = reviewer.firstName;
        this.form.lname = reviewer.lastName;
        this.form.email = reviewer.email;
        this.form.isAdmin = reviewer.isAdmin;
      } catch (err) {
        console.log(err);
      }
    },

    //User clicked the delete user button
    showDeleteUserModal() {
      this.showModal = true;
    },

    async deleteUserConfirmed() {
      // console.log(
      //   "Function called to delete the user " + this.passedReviewerId
      // );
      //Get reference to cloud function to delete user
      const deleteReviewer_ref = firebase
        .functions()
        .httpsCallable("deleteReviewer");

      //Call cloud function to delete the reviewer from the Firebase auth db
      await deleteReviewer_ref({
        uid: this.passedReviewerId,
        email: this.form.email,
      })
        .then(() => {
          // console.log(result);

          //Delete reviewer from reviewers collection
          firebase
            .firestore()
            .collection("Reviewers")
            .doc(this.passedReviewerId)
            .delete();

          //Return to review list screen
          this.returnToPreviousScreen();
        })
        .catch((err) => alert(err));
    }, //User confirmed they want to delete the user
  },

  // This method runs on page load.
  mounted() {
    this.getReviewer();
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>