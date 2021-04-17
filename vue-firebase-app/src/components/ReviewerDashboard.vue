<!--
* ReviewerDashboard.vue
*
* Description: Provides a landing place
* once a user flagged as a reviewer has logged in.
*
-->

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Progress</h5>
            <h1>###</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews Completed</h5>
            <h1>###</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Project</h5>
            <h1>###</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">% Project Complete</h5>
            <h1>###</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create Review</h5>
            <h1><button class="btn btn-primary">Add</button></h1>
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
              <router-link to="/ReviewerDashBoard" class="nav-link"
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
  import getCollection from '../composables/getCollection'

  export default {
    setup() {
      const in_progress_reviews = ref([])
      const completed_reviews = ref([])
      const percentage_completed = 0
      const { documents: reviews_in_project, error } = getCollection('Reviews')

      console.log(reviews_in_project)

      // const completed_reviews = reviews_in_project.value.filter((review) => {
      //   return review.status.includes('In-Progress')
      // })

      return {
        in_progress_reviews,
        reviews_in_project,
        percentage_completed,
        completed_reviews,
        error,
      }
    },
  }
</script>

<style></style>
