<!--
* CurrentProjects.vue
*
* Description: Overview for Current Projects Landing Page
* allows the user to review existing projects.
*
-->

<template>
    <!-- Card which displays all  -->
    <div class="container scrollcontainer">
    <div class="col-md-10">
    <div class="card">
    <div class="card-header">Current Projects
      <div style="float:right;">
        <button @click="showModal = true" class="btn btn-primary btn-sm">
          New Project
        </button>
      </div>
    </div>
      <table class="table">
        <thead class="project-head">
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Clients</th>
            <th style="text-align:center">Reviews</th>
            <th>Status</th>
            <th>Organization</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody class="project-body" v-for="project in projects" :key="project.id">
            <tr>
              <td>{{project.title}}</td>
              <td>{{project.description}}</td>
              <div v-for="client in project.clients" :key="client.id">
                <td>{{client.firstName}}</td>
              </div>
              <td style="text-align:center">{{project.num_reviews}}</td>
              <td>{{project.status}}</td>
              <td>{{project.organization}}</td>
              <td><button class="btn edit" @click="editProject(project), (showEditModal = true)">Edit</button></td>
              <td><button class="btn delete" @click="deleteProject(project.id)">Delete</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    </div>
    </div>
    <new-project-modal
      v-if="showModal"
      :new_project="new_project"
      @close="showModal = false"
    ></new-project-modal>
    <edit-project-modal v-if="showEditModal"
      :update_project="update_project"
      @close="showEditModal = false"
    ></edit-project-modal>
</template>

<script>
import modifyDocument from '../composables/modifyDocument'
import getCollection from '../composables/getCollection'
import NewProjectModal from '../components/NewProjectModal'
import EditProjectModal from '../components/EditProjectModal'
import { ref, reactive } from 'vue'
import('../assets/styles/styles.css') 

export default {
  name: "CurrentProjects",
  components: {
    NewProjectModal,
    EditProjectModal
  },
  setup() {
    const showModal = ref(false)
    const showEditModal = ref(false)
    const { documents: projects, error } = getCollection('Projects')
    const update_project = reactive({})
    const new_project = reactive({
            title: '',
            description: '',
            status: 'New',
            num_reviews: 0,
            organization: '',
            org_ref: '',
            clients: [],

        })
    const editProject = (project) => {
            let updates = {}
            updates = Object.assign({}, project)
            update_project.value = updates
    }
    const deleteProject = async (id) => {
        if (confirm('Are you sure?')) {
            modifyDocument('Projects', id).deleteDoc()
        } else {
            console.log('error')
        }
    }
    return {
        projects,
        error,
        showModal,
        showEditModal,
        deleteProject,
        editProject,
        NewProjectModal,
        EditProjectModal,
        update_project,
        new_project
    }
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>