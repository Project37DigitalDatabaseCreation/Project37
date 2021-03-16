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
    <div class="card-header">Current Projects</div>
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
              <td><button class="btn edit" id="show-modal" @click="openModal(project)">Edit</button></td>
              <td><button class="btn delete" id="delete-project" @click="deleteProject(project)">Delete</button></td>
            </tr>
        </tbody>
      </table>
      <modal
        v-if="this.showModal"
        v-on:edit-project="updateProject"
        :selectedProject="this.selectedProject"
        :organizations="this.organizations"
        @close="closeModal"
      ></modal>
    </div>
    </div>
    </div>
    </div>
</template>

<script>

import getCollection from '../composables/getCollection'

export default {
  name: "CurrentProject",
  components: {

  },

  setup() {
        const { documents: projects, error } = getCollection('Projects')
        return {
            projects,
            error,
        }
    },
  data() {
    return {
      showModal: false,
      selectedProject: {},
      organizations: [],
      mounted: null,
    };
  },
  methods: {
    openModal(project){
      this.selectedProject = Object.assign({}, project);
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
    }
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>