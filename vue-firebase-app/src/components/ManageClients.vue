<!--
* ManageClients.vue
*
* Description: Provides the interface to view clients as well
* as add new clients.
*
-->

<template>
  <div class="container">
    <div>
      <button @click="showModal = true" class="btn btn-primary btn-sm">
        Add Clients
      </button>
    </div>
    <modal v-if="showModal" @close="showModal = false" />
    <table class="table table-hover table-borderless table-striped">
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
    <p class="mt-3">Current Page: {{ currentPage }}</p>
  </div>
</template>

<script>
  import getClients from '../composables/getClients'
  import modal from '../components/ClientEntry'
  import { ref } from 'vue'

  export default {
    components: { modal },

    setup() {
      const showModal = ref(false)
      const currentPage = ref(1)
      const { clients, error, loadClients } = getClients()

      // Loads the clients for the data table
      loadClients()

      return { clients, error, currentPage, showModal }
    },
  }
</script>
