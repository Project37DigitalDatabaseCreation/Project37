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
          <th>Account Status</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reviewer, index) in getReviewers"
          :key="index"
          @click="edit(reviewer.email)"
        >
          <td>{{ reviewer.name }}</td>
          <td>{{ reviewer.email }}</td>
          <td>{{ reviewer.status }}</td>
          <td>{{ reviewer.lastLogin }}</td>
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

export default {
  data() {
    return {
      //TODO - Temp data object for testing. Future iteration will read from database
      getReviewers: {
        1: {
          name: "Ben McElyea",
          email: "bmcelyea@asu.edu",
          status: "Active",
          lastLogin: "1/18/2020",
        },
        2: {
          name: "Isaac Landis",
          email: "ilandis@asu.edu",
          status: "Active",
          lastLogin: "1/17/2020",
        },
        3: {
          name: "Armando Minor",
          email: "aminor1@asu.edu",
          status: "Active",
          lastLogin: "1/12/2020",
        },
        4: {
          name: "Andrew Massart",
          email: "amassart@asu.edu",
          status: "disabled",
          lastLogin: "1/12/2020",
        },
        5: {
          name: "Stephen Kizer",
          email: "kizerste@asu.edu",
          status: "disabled",
          lastLogin: "1/12/2020",
        },
      },
    };
  },
  methods: {
    edit(reviewer) {
      // TODO Temp method for testing. Future iteration will load the edit user page
      alert(`TODO - Edit user ${reviewer}`);
    },

    prevPage() {
      alert("TODO - previous page");
    },
    nextPage() {
      alert("TODO - next page");
    },
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
   margin:0 auto;
   
}
.paginationContainer {

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>