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
      <table id="reviewers_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Account Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody v-for="(reviewer, index) in getReviewers" :key="index">
          <tr >
            <td>{{ reviewer.name }}</td>
            <td>{{ reviewer.email }}</td>
            <td>{{ reviewer.status }}</td>
            <td>{{ reviewer.lastLogin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

</template>


<script>
//import firebase from "firebase";

export default {
  data() {
    return {
      //Temp data object for testing. Future iteration will read from database
      getReviewers: {
        1: {
          name: "Ben McElyea",
          email: "bmcelyea@asu.edu",
          status: "Active",
          lastLogin: "1/18/2020",
        },
        2: {
          name: "Issac Landis",
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
  methods: {},
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

td {
  text-align: center;
  padding: 10px;
}

table {

  padding: 12px;
  width: 100%;
  border: 1px solid #ddd;
}



</style>