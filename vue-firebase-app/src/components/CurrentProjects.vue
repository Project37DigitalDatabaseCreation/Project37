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
            <table>
              <thead>
              <tr>
                <th>Project</th>
                <th>Clients</th>
                <th>Reviews</th>
                <th>Status</th>
                <th>Organization</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="project in projects" :key="project" v-on:click="clickProject(project)">
                <td>{{project.title}}</td>
                <td>{{project.clients}}</td>
                <td>{{project.num_reviews}}</td>
                <td>{{project.status}}</td>
                <td>{{project.organization}}</td>
              </tr>
              </tbody>
              
            </table>
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
      projects: []
    };
  },
  methods: {
    readProjects() {
      let projects = [];
      firebase.firestore().collection("Projects")
        .get()
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
    clickProject(project){
      console.log("clickList fired with " + project.title);
      this.$router.push({
    name: 'ViewProject',
    params: {
        project: project.title
    }
});

    }
  },
  mounted() {
    this.readProjects();
  },
};
</script>

<style scoped>
tr:hover {
  background-color: #ddd;
}
</style>