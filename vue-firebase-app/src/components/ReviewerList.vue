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
-->

<template>
  <div class="container">
    <router-view></router-view>
    <h4>Reviewers</h4>
    <div>
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="AddReviewer"
      >
        + Add Reviewer
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email Address</th>
          <th>Administrator</th>
          <!-- <th>Last Login</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reviewer, index) in reviewerData"
          :key="index"
          @click="modifyReviewer(reviewer.id)"
        >
          <td>{{ reviewer.first_name + " " + reviewer.last_name }}</td>
          <td>{{ reviewer.email }}</td>
          <td>{{ reviewer.is_admin === "true" ? "Yes" : "No" }}</td>
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
    // edit(reviewer) {
    //   db.collection("Reviewers").get();
    // },

    AddReviewer() {
      this.$router.push({ name: "AddReviewer" });
    },

    prevPage() {
      alert("TODO - previous page");
    },
    nextPage() {
      alert("TODO - next page");
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
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
  mounted() {
    console.log("In mount");
    this.getReviewers();
  },
};
</script>

<style scoped>
h4 {
  text-align: center;
}
th {
  padding-top: 12px;
  text-align: center;
  padding-bottom: 12px;
  background-color: #f2f2f2;
  color: black;
}
tr:hover {
  background-color: #ddd;
}

td {
  text-align: center;
  padding: 10px;
}

table {
  padding: 12px;
  width: 100%;
  border: 1px solid #ddd;
}

button {
  margin-bottom: 10px;
}
.paginationContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>