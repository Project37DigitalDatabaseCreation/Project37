<!--
* CurrentProjects.vue
*
* Description: Overview for Current Projects Landing Page
* allows the user to review existing projects.
*
-->

<template>
    <!-- Card which displays all  -->
    <div id="project-info" class="container">
    <div style="position:fixed; left:200px; width:90%;">
    <div class="justify-content-center">
    <div class="col-md-10" style="padding:0 !important;">
    <div class="card">
    <div class="card-header text-center" style="font-size: 1.5em">Current Projects</div>
      <table ref="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Clients</th>
            <th>Reviews</th>
            <th>Status</th>
            <th>Organization</th>
            </tr>
            </thead>
          <tbody>
              <tr v-for="project in projects" :key="project">
                <td>{{project.title}}</td>
                <td>{{project.description}}</td>
                <td>{{project.clients.join(', ')}}</td>
                <td>{{project.num_reviews}}</td>
                <td>{{project.status}}</td>
                <td>{{project.organization}}</td>
                <td><button class="btn btn-primary" id="show-modal" @click="openModal(project)">Edit</button></td>
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
      error: null
    };
  },
  methods: {
    updateProject(project){
      this.projects = []
      firebase.firestore().collection("Projects").doc(project.id).update({
        title: project.title,
        description: project.description,
        org_ref: project.org_ref,
        organization: project.organization,
        status: project.status,
        clients: project.clients
      })
      .then(function() {})
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    readProjects() {
      firebase.firestore().collection("Projects")
        .get()
        .then((result) => {
          result.forEach((doc) => {
            this.projects.push({
              id: doc.id,
              title: doc.data().title,
              status: doc.data().status,
              num_reviews: doc.data().num_reviews,
              org_ref: doc.data().org_ref,
              organization: doc.data().organization,
              description: doc.data().description,
              clients: doc.data().clients
            });
          });
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
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
      refreshProjects(){
        this.projects = []
        firebase.firestore().collection("Projects")
        .get()
        .then(result => {
          result.forEach((doc) => {
            this.projects.push({
              id: doc.id,
              title: doc.data().title,
              status: doc.data().status,
              num_reviews: doc.data().num_reviews,
              org_ref: doc.data().org_ref,
              organization: doc.data().organization,
              description: doc.data().description,
              clients: doc.data().clients
            });
          });
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
    const ref = firebase.firestore().collection('Projects')
    ref.onSnapshot(querySnapshot => {
      var projectsArray = [];
      querySnapshot.forEach(doc => {
        let p = doc.data();
        p.id = doc.id;
        projectsArray.push(p);
      });
        this.projects = projectsArray;
    });
  },
  mounted() {
    this.readOrganizations();
  },
};
</script>

<style scoped>
tr:hover {
  background-color: #ddd;
}
</style>