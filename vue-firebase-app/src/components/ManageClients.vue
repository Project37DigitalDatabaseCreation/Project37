<!--
* ManageClients.vue
*
* Description: Provides the interface to view clients as well
* as add new clients.
*
-->

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-1">
        <h4>Clients</h4>
      </div>
      <div class="col">
        <button class="btn btn-primary">+ Add Client</button>
      </div>
    </div>
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
    <div>
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import getClients from '../composables/getClients'
  export default {
    setup() {
      const { clients, error, loadClients } = getClients()

      // Loads the clients for the data table
      loadClients()

      return { clients, error }
    },
  }
</script>
