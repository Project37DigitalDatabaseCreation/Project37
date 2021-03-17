<!--
* CurrentProjects.vue
*
* Description: Overview for Current Projects Landing Page
* allows the user to review existing projects.
*
-->

<template>
    <!-- Card which displays all  -->
    <div class="container">
    <div class="container-layout">
    <div class="col-md-10">
    <div class="card">
    <div class="card-header">Current Projects
      <div style="float:right;">
          <edit-project-modal v-if="showEditModal"
              :update_project="update_project"
              @close="showEditModal = false"></edit-project-modal>
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
        <tbody class="project-body">
            <tr v-for="project in projects" :key="project.id">
              <td>{{project.title}}</td>
              <td>{{project.description}}</td>
              <td>{{project.clients.join(', ')}}</td>
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
    </div>
    <modal
        v-if="showModal"
        @close="showModal = false"
      ></modal>
</template>

<script>
import modifyDocument from '../composables/modifyDocument'
import getCollection from '../composables/getCollection'
import EditProjectModal from '../components/EditProjectModal'
import { ref, reactive } from 'vue'

export default {
  name: "CurrentProjects",
  components: {
    EditProjectModal,
  },

  setup() {
    const showModal = ref(false)
    const showEditModal = ref(false)
    const { documents: projects, error } = getCollection('Projects')
    const update_project = reactive({})
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
        EditProjectModal,
        update_project,
    }
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>