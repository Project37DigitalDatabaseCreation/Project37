<!--
* Login.vue
*
* Description: Provides a landing place
* once a user has logged in.
*
-->
<template>
  <div class="container">
    <h4 class="mt-4 text-center">Latest Reviews:</h4>
    <span style="color: red">{{ error }}</span>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Client</th>
          <th scope="col">Reviewer</th>
          <th scope="col">Project</th>
          <th scope="col">Points</th>
          <th scope="col">Status</th>
          <th scope="col">Review</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td>{{ review.org.title }}</td>
          <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName }}</td>
          <td>{{ review.project.title }}</td>
          <td></td>
          <td>{{ review.status }}</td>
          <td></td>
        </tr>
      </tbody>          
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
    data() {
    return {
      reviews: [],
      error: null
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() { 
    firebase.firestore().collection("Reviews").orderBy("modified", "desc").limit(10).get()
    .then(result => {
      result.forEach(doc => {
        let review = doc.data();
        review.id = doc.id;

        review.project_ref.get()
        .then(doc => {
          let proj = doc.data();
          proj.id = doc.id;
          review.project = proj;

          proj.org_ref.get()
          .then(doc => {
            let org = doc.data();
            org.id = doc.id;
            review.org = org;

            review.reviewer_ref.get()
            .then(doc => {
              let reviewer = doc.data();
              reviewer.id = doc.id;
              review.reviewer = reviewer;

              this.reviews.push(review);
            });            
          });              
        });        
      })}).catch(err => { console.error(err) });
  },
};
</script>
