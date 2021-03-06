<!--
* Dashboard.vue
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
          <td>{{ review.points }}</td>
          <td>{{ review.met_status }}</td>
          <td></td>
        </tr>
      </tbody>          
    </table>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
    data() {
    return {
      reviews: [],
      standards: [],
      error: null
    };
  },
  async mounted() {
    const db = firebase.firestore();
    
    await db.collection("Reviews").orderBy("modified", "desc").limit(10).get()
    .then(result => {
      result.forEach(doc => {
        let review = doc.data();
        review.id = doc.id;
        review.org = {};
        review.org.title = "";
        review.reviewer = {};
        review.reviewer.lastName = "";
        review.reviewer.firstName = "";
        review.project = {};
        review.project.title = "";

        let index = this.reviews.push(review) - 1;   

        review.project_ref.get()
        .then(doc => {
          let proj = doc.data();
          proj.id = doc.id;
          this.reviews[index].project = proj;

          proj.org_ref.get()
          .then(doc => {
            let org = doc.data();
            org.id = doc.id;
            this.reviews[index].org = org;

            review.reviewer_ref.get()
            .then(doc => {
              let reviewer = doc.data();
              reviewer.id = doc.id;
              this.reviews[index].reviewer = reviewer;                                       
            });            
          });              
        });        
      })}).catch(err => { console.error(err) });

    let querySnapshot = await db.collection("Standards").get();

    querySnapshot.forEach(doc => {
      let standard = {};
      standard.id = doc.id;
      standard.points = doc.data().points;
      this.standards.push(standard);
    });        

    for (let i = 0; i < this.reviews.length; i++) {
      let reviewRef = db.doc("/Reviews/" + this.reviews[i].id);          
      this.reviews[i].points = 0;
      this.reviews[i].met_status = "Met";
      
      db.collection("Scores").where("review_ref", "==", reviewRef).get()
      .then(result => {        
        result.forEach(doc => {
          let score = doc.data();
          
          if(score.standard_ref) {            
            const scoreStandard = this.standards.find(function(standard) {
              return standard.id === score.standard_ref.id;
            });
            
            if (scoreStandard && score.met) {
              this.reviews[i].points += scoreStandard.points;
            }
            
            if (scoreStandard && !score.met && scoreStandard.points == 3) {
              this.reviews[i].met_status = "Not Met";
            }
          }
        });
      });        
    }
  }
};
</script>
 