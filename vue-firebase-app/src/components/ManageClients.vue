<!--
* ManageClients.vue
*
* Description: Provides the interface to view clients as well
* as add new clients.
*
-->

<template>
  <div class="container">
    <ClientEntry />
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
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import getClients from '../composables/getClients'
  import ClientEntry from '../components/ClientEntry'

  export default {
    components: { ClientEntry },
    setup() {
      const rows = computed(() => {
        return clients.length
      })
      const perPage = ref(0)
      const currentPage = ref(1)
      const { clients, error, loadClients } = getClients()

      // Loads the clients for the data table
      loadClients()
      console.log(clients)
      console.log(rows)

      return { clients, error, rows, perPage, currentPage }
    },
  }
</script>
