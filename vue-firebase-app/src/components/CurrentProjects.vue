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
            <tr v-for="project in projects" :key="project">
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

import firebase from 'firebase'
import modal from "@/components/EditProject";
export default {
  name: "CurrentProject",
  components: {
    modal
  },
  data() {
    return {
      showModal: false,
      selectedProject: {},
      organizations: [],
      projects: [],
      mounted: null,
      error: null
    };
  },
  methods: {
    updateProject(project){
      firebase.firestore().collection("Projects").doc(project.id).update({
        title: project.title,
        description: project.description,
        org_ref: firebase.firestore().doc("/Organizations/" + project.org_ref),
        organization: project.organization,
        status: project.status,
        clients: project.clients
      })
      .then(function() {})
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    deleteProject(project){
      if(confirm("Delete " + project.title + "?")) {
        firebase.firestore().collection("Projects").doc(project.id).delete()
        .then(() => {})
          .catch(function(error) {
            console.error("Error deleting document: ", error);
          });
      }
    },
    readOrganizations() {
      let organizations = [];
      firebase.firestore().collection("Organizations").get()
        .then((result) => {
          result.forEach((doc) => {
            this.organizations.push({
              id: doc.id,
              title: doc.data().title,
            });
          });
            return organizations
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
    openModal(project){
      this.selectedProject = Object.assign({}, project);
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
    }
  },
  created() {
    this.projects = []
    const ref = firebase.firestore().collection('Projects').orderBy("title", "asc")
    ref.onSnapshot(querySnapshot => {
      var projectsArray = [];
      querySnapshot.forEach(doc => {
        let p = doc.data();
        p.id = doc.id;
        projectsArray.push(p);
      });
        this.projects = projectsArray;
    });
    this.readOrganizations();

  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>