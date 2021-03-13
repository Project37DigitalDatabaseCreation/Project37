<template>
  <div class="container">
    <div class="row justify-content-center">
      <h3>Welcome: {{ user.data.displayName }}</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Progress</h5>
            <!-- <h1>{{ reviewStats.NewReviewsCount }}</h1> -->
            <h1>00</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews Completed</h5>
            <!-- <h1>{{ reviewStats.InProgressReviewsCount }}</h1> -->
            <h1>11</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reviews in Project</h5>
            <!-- <h1>{{ reviewStats.CompletedReviewsCount }}</h1> -->
            <h1>22</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">% Project Complete</h5>
            <!-- <h1>{{ projectStats.CurrentProjectsCount }}</h1> -->
            <h1>33</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: 'user',
      }),
    },
  }
</script>

<style></style>
