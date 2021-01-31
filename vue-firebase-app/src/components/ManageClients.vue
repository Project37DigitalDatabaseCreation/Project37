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
        <tr
          v-for="(clients, index) in getClients"
          :key="index"
          @click="edit(clients.email)"
        >
          <td>{{ clients.firstName }}</td>
          <td>{{ clients.lastName }}</td>
          <td>{{ clients.email }}</td>
          <td>{{ clients.organization }}</td>
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
  export default {
    data() {
      return {
        getClients: {
          1: {
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@email.com',
            organization: 'ASU',
          },
          2: {
            firstName: 'Hank',
            lastName: 'Hill',
            email: 'msu@msu.edu',
            organization: 'Michigan State University',
          },
          3: {
            firstName: 'Sally',
            lastName: 'Woodlocks',
            email: 'mcc@mcc.com',
            organization: 'Mesa Community College',
          },
        },
      }
    },
    methods: {
      edit(clients) {
        alert(`TODO - Attach ${clients} row to database`)
      },

      prevPage() {
        alert('TODO - previous page')
      },
      nextPage() {
        alert('TODO - next page')
      },
    },
  }
</script>
