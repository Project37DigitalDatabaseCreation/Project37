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
                    name="fname"
                    value
                    required
                    autofocus
                    v-model="form.fname"
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
                    name="lname"
                    value
                    required
                    v-model="form.lname"
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
                    name="email"
                    value
                    required
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
                    name="admin"
                    value="yes"
                    v-model="form.isAdmin"
                  />
                  <label for="Administrator Access">Yes</label>
                  <br />
                  <input
                    class="radioButton"
                    type="radio"
                    name="admin"
                    value="no"
                    v-model="form.isAdmin"
                  />
                  <label for="No access">No</label>
                  <br />
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="updateClicked(), $emit('close')">
                Update
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

export default {
  emits: ["update-clicked", "close"],
  props: {
    // The Firestore doc id of the reviewer is passed into this prop
    // when the user is clicked on in the ModifyReviewer.vue table
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
      error: null,
      isAdminSet: false,
    };
  },

  methods: {
    //Method to modify a existing user
    async updateClicked() {
      if (this.form.isAdmin === "yes") {
        this.isAdminSet = true;
      } else {
        this.isAdminSet = false;
      }

      let modifiedUser = {
        firstName: this.form.fname,
        lastName: this.form.lname,
        email: this.form.email,
        isAdmin: this.isAdminSet,
      };

      await firebase
        .firestore()
        .collection("Reviewers")
        .doc(this.passedReviewerId)
        .set(modifiedUser);

      this.$emit("update-clicked");
      this.$emit("close");
      // this.returnToPreviousScreen();
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

        if (reviewer.isAdmin === true) {
          this.form.isAdmin = "yes";
        } else {
          this.form.isAdmin = "no";
        }
      } catch (err) {
        alert(err);
      }
    },
  },

  // This method runs on page load.
  mounted() {
    this.getReviewer();
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>