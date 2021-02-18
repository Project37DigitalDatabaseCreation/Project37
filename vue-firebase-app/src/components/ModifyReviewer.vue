<!--
* AddReviewer.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to modify existing reviewers. 
* Contains the fields First Name, Last Name and email address and a checkbox
* that designates if the user is an administrator
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Modify reviewer
            <button type="button" class="btn btn-danger"  @click.prevent="showDeleteUserModal">Delete User</button>
          </div>
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
                  class="col-md-4 col-form-label text-md-right"
                  >Administror Access</label
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
                <div class="col-md-8 offset-md-4">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="returnToPreviousScreen"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click.prevent="updateClicked"
                    class="btn btn-primary"
                  >
                    Update reviewer
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Reset password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showModal"
      v-on:ok-click="deleteUserConfirmed"
      :passedMessage="this.modalMessage + ' ' + this.form.fname +  ' ' + this.form.lname + '? This action cannot be undone.'"
      :passedMessageTitle="this.modalMessageTitle"
      @close="showModal = false"
    />
  </div>
</template>


<script>
//import firebase from "firebase";
import firebase from "firebase";
import "firebase/firestore";
import modal from "@/components/DeleteReviewerModal";

export default {
   components: {
    modal
  },
  props: {
    // The Firestore doc id of the reviewer is passed into this prop
    // when the user is clicked on in the ReviewerList.vue
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
      modalMessageTitle: "Are you sure?"
    };
  },

  methods: {

    //Method to modify a existing user 
    async updateClicked() {
      console.log("Update clicked");
      let modifiedUser = {
        firstName: this.form.fname,
        lastName: this.form.lname,
        email: this.form.email,
        isAdmin: this.form.isAdmin,
      };

      await firebase
        .firestore()
        .collection("Reviewers")
        .doc(this.passedReviewerId)
        .set(modifiedUser);
      console.log(modifiedUser);
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
          console.log(snapshot.empty);
          const reviewer = snapshot.data();
          console.log(reviewer);
          this.form.fname = reviewer.firstName;
          this.form.lname = reviewer.lastName;
          this.form.email = reviewer.email;
          this.form.isAdmin = reviewer.isAdmin;
        });
    },

    //User clicked the delete user button
     showDeleteUserModal() {

      this.showModal = true

    },

    //User confirmed they want to delete the user
    async deleteUserConfirmed(){

      console.log(`Deleting user ${this.passedReviewerId}`)
       await firebase
        .firestore()
        .collection("Reviewers")
        .doc(this.passedReviewerId)
        .delete();
      this.returnToPreviousScreen()
    }
  },

  // This method runs on page load.
  mounted() {
    this.getReviewer();
  },
};
</script>
<style scoped>
.radioButton,
button {
  margin-right: 10px;
}
.btn-danger{
   float: right;
}
/* TODO: Add in breakpoints for the width */
</style>