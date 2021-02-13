<!--
* ViewProject.vue
*
* Description: Overview for View Project Landing Page:
* allows the user to view an existing projects information.
*
-->

<template>
  <!-- Container to display Project -->
  <div id="project-info" class="container">
  <div style="position:fixed; left:200px; width:90%;">
  <div class="justify-content-center">
  <div class="col-md-10" style="padding:0 !important;">
  <div class="card">
  <div class="card-header text-center">View Project</div>
  <div class="card-body">
  <div v-if="error" class="alert alert-danger">{{error}}</div>
    <!-- Display project information -->
    <div v-for="project in projects" :key="project">
      <label for="title" class="col-md-12 text-center">Title: {{project.title}}</label>
    </div>
    <div v-for="project in projects" :key="project">
      <label for="client" class="col-md-12 text-center">Clients: {{project.clients.join(', ')}}</label>
    </div>
    <div v-for="project in projects" :key="project">
      <label for="client" class="col-md-12 text-center">Status: {{project.status}}</label>
    </div>
    <div v-for="project in projects" :key="project">
      <label for="organization" class="col-md-12 text-center">Organization: {{project.organization}}</label>
    </div>
    <div v-for="project in projects" :key="project">
      <label for="description" class="col-md-12 text-center">Description: {{project.description}}</label>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>
 
<script>
  import firebase from 'firebase'
  export default {
    data() {
        return {
          projects: [],
          title: this.project
        };
      },
      mounted() {
        this.readProjects();
      },
      methods: {
        readProjects() {
          let projects = [];
          firebase.firestore().collection("Projects")
            .where("title", "==", this.title).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
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
              return projects
            })
            .catch((error) => {
              console.log("Error retrieving documents: ", error);
            });
        },
      },
      props: ['project']
  }
</script>