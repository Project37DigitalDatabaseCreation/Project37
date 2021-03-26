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
  <div class="container scrollcontainer">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header">Modify Reviewer</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label
                  for="First Name"
                  class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >

                <div class="col-md-6">
                  <input
                    id="fname"
                    type="text"
                    class="form-control"
                    name="fname"
                    value
                    required
                    autofocus
                    v-model="form.fname"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="Last Name"
                  class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >

                <div class="col-md-6">
                  <input
                    id="lname"
                    type="text"
                    class="form-control"
                    name="lname"
                    value
                    required
                    autofocus
                    v-model="form.lname"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-6 col-form-label text-md-right"
                  >Administrator Access</label
                >
                <div class="col-md-6">
                  <input
                    class="radioButton"
                    type="radio"
                    name="isAdmin"
                    id="yes"
                    value="true"
                    v-model="form.isAdmin"
                  />
                  <label for="Administrator Access">Yes</label>
                  <br />
                  <input
                    class="radioButton"
                    type="radio"
                    name="isAdmin"
                    value="false"
                    v-model="form.isAdmin"
                  />
                  <label for="No access">No</label>
                  <br />
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-14">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="updateClicked"
                  >
                    Update
                  </button>
                  &nbsp;
                  <button type="submit" class="btn btn-primary">
                    Reset Password
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="returnToPreviousScreen"
                  >
                    Cancel
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click.prevent="showDeleteUserModal"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
    <modal
      v-if="showModal"
      v-on:ok-click="deleteUserConfirmed"
      :passedMessage="
        this.modalMessage +
        ' ' +
        this.form.fname +
        ' ' +
        this.form.lname +
        '? This action cannot be undone.'
      "
      :passedMessageTitle="this.modalMessageTitle"
      @close="showModal = false"
    />
  </div>
</template>


<script>
import firebase from "firebase";
import "firebase/firestore";
import modal from "@/components/DeleteReviewerModal";

export default {
  components: {
    modal,
  },
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
      await firebase
        .firestore()
        .collection("Reviewers")
        .doc(this.passedReviewerId)
        .get()
        .then((snapshot) => {
          // console.log(snapshot.empty);
          const reviewer = snapshot.data();
          // console.log(reviewer);
          this.form.fname = reviewer.firstName;
          this.form.lname = reviewer.lastName;
          this.form.email = reviewer.email;
          this.form.isAdmin = reviewer.isAdmin;
        });
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