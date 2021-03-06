<!--
* ManageClients.vue
*
* Description: Provides the interface to view and/or modify clients.
*
-->

<template>
  <div class="container">
    <div>
      <button @click="showModal = true" class="btn btn-primary btn-sm">
        Add Clients
      </button>
      <client-modify-modal
        v-if="showEditModal"
        :update_client="update_client"
        @close="showEditModal = false"
      ></client-modify-modal>
    </div>
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
          <td>
            <button
              @click="modifyClient(client), (showEditModal = true)"
              class="btn btn-primary btn-sm"
            >
              Modify
            </button>
            <button
              @click="handleDelete(client.id)"
              class="btn btn-warning btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
  </div>

  <!-- modal definition -->
  <client-modal
    v-if="showModal"
    :new_client="new_client"
    @close="showModal = false"
  />
</template>

<script>
  import modifyDocument from '../composables/modifyDocument'
  import ClientModal from '../components/ClientModal'
  import ClientModifyModal from '../components/ClientModifyModal'
  import { ref, reactive } from 'vue'
  import getCollection from '../composables/getCollection'

  export default {
    components: { ClientModal, ClientModifyModal },

    setup() {
      const showModal = ref(false)
      const showEditModal = ref(false)
      const currentPage = ref(1)
      const { documents: clients, error } = getCollection('Clients')
      const new_client = reactive({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
      })
      const update_client = reactive({})

      const modifyClient = (client) => {
        let updates = {}
        updates = Object.assign({}, client)
        update_client.value = updates
      }

      const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
          modifyDocument('Clients', id).deleteDoc()
        } else {
          console.log('error')
        }
      }

      return {
        clients,
        error,
        currentPage,
        showModal,
        showEditModal,
        handleDelete,
        modifyClient,
        ClientModal,
        ClientModifyModal,
        update_client,
        new_client,
      }
    },
  }
</script>
