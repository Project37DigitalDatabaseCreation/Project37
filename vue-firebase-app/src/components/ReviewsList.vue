<template>
  <div class="container scrollcontainer">
    <div class="card" style="margin-right: -15px; margin-left: -15px">
      <div class="card-header">
        Reviews
        <div style="float: right">
          <button
            :disabled="!sortedStandards"
            class="btn btn-sm"
            style="margin-right: 4px; background-color: #49703b"
            @click="goToCreate"
          >
            Create Review
          </button>
        </div>
        <div
          v-if="!sortedStandards"
          class="col-sm-12"
          style="font-size: 12px; margin-top: 6px; color: grey; width: 100%"
        >
          We are getting the standards right now, you can create or edit a
          review once they're all loaded.
        </div>
      </div>
      <div class="table-responsive">
        <table class="table" style="margin: 0 !important">
          <thead class="project-head">
            <tr>
              <th>Course Name</th>
              <th>Reviewer</th>
              <th>Status</th>
              <th>Points</th>
              <th></th>
            </tr>
          </thead>
          <div
            v-if="loading"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            "
          >
            <div class="loader"></div>
          </div>
          <tbody v-else class="project-body">
            <tr v-for="review in reviews" :key="review.id">
              <td>{{ review.course_name }}</td>
              <td>
                {{ reviewerName(review) }}
              </td>
              <td>{{ review.status }}</td>
              <td>{{ review.points }}</td>
              <td>
                <button
                  title="edit"
                  class="btn edit"
                  @click="goToEdit(review)"
                ></button>
              </td>
              <!-- <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
                <td><button class="btn btn-primary" @click="deleteReview(review)">Delete</button></td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    reviews() {
      return this.$store.getters.reviews;
    },
    sortedStandards() {
      return this.$store.getters.sortedStandards;
    },
  },
  methods: {
    goToCreate() {
      //  Push the router
      console.log("reviewtemplate", this.selectedReview);
      this.$router.push({ name: "Review" });
    },
    goToEdit(rev) {
      console.log("rev", rev.id);
      //  Push the router
      this.$router.push({ name: "Review", params: { review: rev.id } });
    },
    reviewerName(review) {
      if (!review.reviewer) return "";
      return review.reviewer.lastName + ", " + review.reviewer.firstName;
    },
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>
