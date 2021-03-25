<!--
* ManageClients.vue
*
* Description: Provides the interface to view and/or modify clients.
*
-->

<template>
    <div class="container">
        <div class="container-layout">
            <div class="col-md-10">
                <div class="card" >
                    <div class="card-header"> Manage Clients
                        <div style="float:right;">
                            <button @click="goToInvitations"
                                class="btn btn-primary btn-sm" style="margin-right:4px;">
                                View Invitations
                            </button>
                            <button @click="showModal = true"
                                class="btn btn-primary btn-sm">
                                Add Clients
                            </button>
                            <client-modify-modal v-if="showEditModal"
                                :update_client="update_client"
                                @close="showEditModal = false"></client-modify-modal>
                        </div>
                    </div>
                    <table class="table">
                        <thead class="project-head">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Organization</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="project-body">
                            <tr v-for="client in clients" :key="client.id">
                                <td>{{ client.firstName }}</td>
                                <td>{{ client.lastName }}</td>
                                <td>{{ client.email }}</td>
                                <td>{{ client.organization }}</td>
                                <td>
                                    <button
                                        @click="modifyClient(client), (showEditModal = true)"
                                        class="btn edit">
                                        Modify
                                    </button>
                                </td>
                                <td>
                                    <button @click="handleDelete(client.id)"
                                        class="btn delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="mt-3">Current Page: {{ currentPage }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- modal definition -->
    <client-modal v-if="showModal" :new_client="new_client" @close="showModal = false" />
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
            organization: ''
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
            new_client
        }
    },
    methods: {
        goToInvitations() {
            this.$router.push('/invitations')
        }
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>