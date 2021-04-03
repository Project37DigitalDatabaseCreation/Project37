<!--
* ClientDashboard.vue
*
* Description: Provides a landing place
* once a user flagged as a client has logged in.
*
-->

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Progress</h5>
            <h1>4</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews Completed</h5>
            <h1>3</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Project</h5>
            <h1>{{ reviews_in_project.length }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">% Project Complete</h5>
            <h1>33</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h4 class="mt-4 text-center">Completed Reviews:</h4>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Course Code</th>
            <th scope="col">Review #</th>
            <th scope="col">Points</th>
            <th scope="col">Status</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews_in_project" :key="review.id">
            <td>{{ review.course_name }}</td>
            <td>{{ review.id }}</td>
            <td>Need a scheme for review numbers</td>
            <td>Need reference for Points</td>
            <td>{{ review.status }}</td>
            <td>
              <router-link to="/ClientDashBoard" class="nav-link"
                >view</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import firebase from 'firebase'
  import 'firebase/firestore'
  // import getCollection from '../composables/getCollection'

  export default {
    setup() {
      const clientEmail = firebase.auth().currentUser.email
      const in_progress_reviews = ref([])
      const reviews_in_project = ref([])
      let error = ref(null)
      let projectIds = []
      // let results = []
      const percentage_completed = 0
      let projects = {}
      // const { documents: reviews_in_project, error } = getCollection('Reviews')

      const getProjectsByClient = async () => {
        const res = await firebase
          .firestore()
          .collection('Projects')
          .get()

        // map projects to isolate email and user id
        projects.value = res.docs.map((doc) => {
          return {
            email: doc.data().clients.map((client) => client.email),
            id: doc.id,
          }
        })

        // return array of project ids that the current client is
        // associated with as an array
        projectIds.value = projects.value.forEach((client) => {
          if (client.email.includes(clientEmail)) {
            projectIds.push(client.id)
          }
        })
      }
      console.log(projectIds)

      // gather reviews by project reference
      const loadReviews = async (projectReference) => {
        const project_ref = firebase
          .firestore()
          .collection('Projects')
          .doc(projectReference)

        console.log(project_ref)
        const review = ref()
        try {
          const res = await firebase
            .firestore()
            .collection('Reviews')
            .where('project_ref', '==', project_ref)
            .get()

          review.value = res.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        } catch (error) {
          error.value = error.message
        }
        return reviews_in_project.value.push(review.value)
      }

      // results.value = projectIds.value.foreach((projectId) => {
      // const project_ref = firebase
      //   .firestore()
      //   .doc('/Project/Jb5cvRhiz4fLop50oz4O')
      // const response = firebase
      //   .firestore()
      //   .collection('Reviews')
      //   .where('project_ref', '==', project_ref)
      //   .get()
      // console.log(response)
      // console.log(project_ref.docs.data())
      // })

      getProjectsByClient()

      loadReviews('Jb5cvRhiz4fLop50oz4O')
      console.log(reviews_in_project)

      return {
        in_progress_reviews,
        reviews_in_project,
        percentage_completed,
        // completed_reviews,
        loadReviews,
        error,
        projects,
      }
    },
  }
</script>

<style></style>
