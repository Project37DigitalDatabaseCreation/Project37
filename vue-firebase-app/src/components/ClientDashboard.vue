<!--
* ClientDashboard.vue
*
* Description: Provides a landing place
* once a user flagged as a client has logged in.
*
-->

<template>
  <div class="container scrollcontainer">
    <div class="row justify-content-center" style="font-family: Glacial Indifference;">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Progress</h5>
            <h1>{{ in_progress_reviews.length }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews Completed</h5>
            <h1>{{ completed_reviews.length }}</h1>
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
            <h1>{{ percentage_completed }}%</h1>
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
              <button class="btn save" @click="openReview(review.id)">
                Open
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import firebase from 'firebase'
  import 'firebase/firestore'
  import { useRouter } from 'vue-router'

  export default {
    setup() {
      const router = useRouter()
      const clientEmail = firebase.auth().currentUser.email
      const reviews_in_project = ref([])
      const in_progress_reviews = computed(() =>
        reviews_in_project.value.filter((review) =>
          review.status.includes('In-Progress')
        )
      )
      const completed_reviews = computed(() =>
        reviews_in_project.value.filter((review) =>
          review.status.includes('Complete')
        )
      )
      const projectIds = []
      const percentage_completed = computed(() =>
        Math.round(
          (completed_reviews.value.length / reviews_in_project.value.length) *
            100
        )
      )
      let error = ref(null)
      let projects = {}

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
        projects.value.forEach((client) => {
          if (client.email.includes(clientEmail)) {
            projectIds.push(client.id)
          }
        })

        // gather reviews by project reference
        const loadReviews = async (projectReference) => {
          const project_ref = firebase
            .firestore()
            .collection('Projects')
            .doc(projectReference)

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

          return (reviews_in_project.value = reviews_in_project.value.concat(
            review.value
          ))
        }

        // load all the reviews by looping throught the aggregated
        // ids and waiting for their Promise to return
        const loadAllReviews = async (ids) => {
          for await (const id of ids) {
            loadReviews(id)
          }
        }

        loadAllReviews(projectIds)
      }

      getProjectsByClient()

      const openReview = (reviewId) => {
        router.push({
          name: 'Review',
          params: { review: reviewId },
        })
      }
      return {
        in_progress_reviews,
        reviews_in_project,
        percentage_completed,
        projectIds,
        error,
        projects,
        openReview,
        router,
        completed_reviews,
      }
    },
  }
</script>

<style scoped src="../assets/styles/styles.css"></style>
