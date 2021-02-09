<!--
* Organizations.vue
*
* Description: Provides a user with admin priveleges the ability
* to View, Create, Delete and Update organizations
*
-->

<template>
  <div class="container">
    <h1 class="mt-4 text-center">Organizations</h1>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="org in organizations" :key="org.id">
          <td>{{ org.title }}</td>
          <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
          <td><button class="btn btn-primary" @click="deleteOrg(review)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import firebase from "firebase";
import { mapGetters } from 'vuex'

export default {
  name: "Organizations",
  components: {
  },
  data() {
    return {
      selected_org: null,
      error: null
    };
  },
  mounted() {
    // Get all of the organizations    
    this.$store.dispatch('fetchOrganizations')
  },
  computed: {
    ...mapGetters(['organizations'])
  },
  methods: {
  }
};
</script>