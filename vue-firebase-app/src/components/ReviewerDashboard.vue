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
            <h5 class="card-title">Reviews</h5>
            <h1>{{ reviews_from_reviewer.length }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews Complete %</h5>
            <h1>{{ percentage_completed }}%</h1>
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
      <h4 class="mt-4 text-center">Reviews:</h4>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Course Code</th>
            <th scope="col">Project</th>
            <th scope="col">Date Created</th>
            <th scope="col">Status</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviews_from_reviewer" :key="review.id">
            <td>{{ review.course_name }}</td>
            <td>{{ review.course_code }}</td>
            <td>{{ review.title.value }}</td>
            <td>{{ review.created }}</td>
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
      const title = ref()
      const userID = firebase.auth().currentUser.uid
      const reviews_from_reviewer = ref([])
      const error = ref(null)

      // const projectIDs = ref([])
      let reviews = {}

      const in_progress_reviews = computed(() =>
        reviews_from_reviewer.value.filter((review) =>
          review.status.includes('In-Progress')
        )
      )
      const fetchProjectTitle = (id) => {
        let item = {}
        const load = async () => {
          let res = await firebase
            .firestore()
            .collection('Projects')
            .doc(id)
            .get()
          item.value = res.data().title
        }
        load()
        return item

        // title.value = res.data().title
      }
      const completed_reviews = computed(() =>
        reviews_from_reviewer.value.filter((review) =>
          review.status.includes('Complete')
        )
      )
      const percentage_completed = computed(() =>
        Math.round(
          (completed_reviews.value.length /
            reviews_from_reviewer.value.length) *
            100
        )
      )

      const getReviewsByReviewer = async () => {
        try {
          const ref = firebase
            .firestore()
            .collection('Reviewers')
            .doc(userID)

          // fetch the reviews by the reviewer reference returned in getReviewerID()
          const res = await firebase
            .firestore()
            .collection('Reviews')
            .where('reviewer_ref', '==', ref)
            .get()

          reviews_from_reviewer.value = res.docs.map((doc) => {
            return {
              course_code: doc.data().course_code,
              course_name: doc.data().course_name,
              created: new Date(
                doc.data().created.seconds * 1000
              ).toUTCString(),
              status: doc.data().status,
              id: doc.id,
              title: fetchProjectTitle(doc.data().project_ref.id),
            }
          })
        } catch (err) {
          error.value = err.message
        }

        console.log(reviews_from_reviewer.value[0])
      }

      //call the function created above
      getReviewsByReviewer()
      // for opening Reviews with the router link
      const openReview = (reviewId) => {
        router.push({
          name: 'Review',
          params: { review: reviewId },
        })
      }
      return {
        in_progress_reviews,
        reviews_from_reviewer,
        percentage_completed,
        error,
        reviews,
        openReview,
        router,
        title,
        fetchProjectTitle,
        completed_reviews,
      }
    },
  }
</script>

<style></style>
