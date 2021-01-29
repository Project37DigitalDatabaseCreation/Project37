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
    <h4>Reviewers</h4>
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
          @click="modifyReviewer(reviewer.email)"
          >
          <td>{{ reviewer.first_name + ' ' + reviewer.last_name }}</td>
          <td>{{ reviewer.email }}</td>
          <td>{{ reviewer.is_admin }}</td>
          
        </tr>
      </tbody>
    </table>
    <div class="paginationContainer">
      <p>
        <button class="btn" @click="prevPage">Previous</button>
        <button class="btn" @click="nextPage">Next</button>
      </p>
    </div>
  </div>
</template>


<script>
//import firebase from "firebase";

import firebase from "firebase";
import "firebase/firestore";
// const db = firebase.firestore();
// const reviewersRef = db.collection("Reviewers");

export default {
  data() {
    return {
      //TODO - Temp data object for testing. Future iteration will read from database
      reviewerData: [],
      
    };
  },
  methods: {
    // edit(reviewer) {
    //   db.collection("Reviewers").get();
    // },

    prevPage() {
      alert("TODO - previous page");
    },
    nextPage() {
      alert("TODO - next page");
    },

    modifyReviewer(reviewer){
       console.log(`TODO - Edit user ${reviewer}`)   
    },


    getReviewers(){

    this.reviewerData = [];
      firebase.firestore().collection("Reviewers")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.reviewerData.push({
              email: doc.data().email,
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              is_admin: doc.data().is_admin,
            });
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        console.log(this.reviewerData)

    },

  
  },
    mounted() {
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
  margin: 0 auto;
}
.paginationContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>