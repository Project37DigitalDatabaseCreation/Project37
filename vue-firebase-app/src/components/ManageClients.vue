<!--
* ManageClients.vue
*
* Description: Provides the interface to view clients as well
* as add new clients.
*
-->

<template>
  <div class="container">
    <h4>Clients</h4>
    <table class="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
          <th>Organization</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.organization }}</td>
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
  // import { ref } from 'vue'
  import getClients from '../composables/getClients'
  export default {
    setup() {
      // const firstName = ref('')
      // const lastName = ref('')
      // const email = ref('')
      // const organization = ref('')

      const { clients, error, loadClients } = getClients()

      // Loads the clients for the data table
      loadClients()

      console.log(clients)

      return { clients, error }
    },
  }
</script>
