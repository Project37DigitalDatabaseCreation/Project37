<!--
* AdminDashboard.vue
*
* Description: Provides a landing place
* once a system admin has logged in.
*
-->
<template>
  <div class="container">
    <span style="color: red">{{ error }}</span>
    <div class="row">
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">New Reviews</h5>
            <h1>{{ reviewStats.NewReviewsCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">In-Progress Reviews</h5>
            <h1>{{ reviewStats.InProgressReviewsCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Complete Reviews</h5>
            <h1>{{ reviewStats.CompletedReviewsCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Current Projects</h5>
            <h1>{{ projectStats.CurrentProjectsCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Complete Projects</h5>
            <h1>{{ projectStats.CompletedProjectsCount }}</h1>
          </div>
        </div>
      </div>                  
    </div>
    <h4 class="mt-4 text-center">In-Progress Reviews:</h4>    
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Client</th>
          <th scope="col">Course</th>
          <th scope="col">Reviewer</th>
          <th scope="col">Project</th>
          <th scope="col">Points</th>
          <th scope="col">Status</th>
          <th scope="col">Review</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in in_progress_reviews" :key="review.id">
          <td>{{ review.org.title }}</td>
          <td>{{ review.course_name }}</td>
          <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName }}</td>
          <td>{{ review.project.title }}</td>
          <td>{{ review.points }}</td>
          <td>{{ review.met_status }}</td>
          <td></td>
        </tr>
      </tbody>          
    </table>
    <h4 class="mt-4 text-center">Completed Reviews:</h4>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Client</th>
          <th scope="col">Course</th>
          <th scope="col">Reviewer</th>
          <th scope="col">Project</th>
          <th scope="col">Points</th>
          <th scope="col">Status</th>
          <th scope="col">Review</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in completed_reviews" :key="review.id">
          <td>{{ review.org.title }}</td>
          <td>{{ review.course_name }}</td>
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
      in_progress_reviews: [],
      completed_reviews: [],
      standards: [],
      reviewStats: {},
      projectStats: {},
      error: null
    };
  },
  methods: {
    addReviewToCollection(collection, review) {
      let index = collection.push(review) - 1;   

      review.project_ref.get()
      .then(doc => {
        let proj = doc.data();
        
        if (proj) {
          proj.id = doc.id;
          collection[index].project = proj;

          proj.org_ref.get()
          .then(doc => {
            let org = doc.data();

            if(org) {
              org.id = doc.id;
              collection[index].org = org; 
            }           
          }); 
        }                              
      });
        
      review.reviewer_ref.get()
      .then(doc => {
        let reviewer = doc.data();
        
        if(reviewer) {
          reviewer.id = doc.id;
          collection[index].reviewer = reviewer; 
        }                                      
      });        
    },
    tallyReviewScores(collection) {
      const db = firebase.firestore();

      for (let i = 0; i < collection.length; i++) {
        let reviewRef = db.doc("/Reviews/" + collection[i].id);          
        collection[i].points = 0;
        collection[i].met_status = "Met";
        
        db.collection("Scores").where("review_ref", "==", reviewRef).get()
        .then(result => {        
          result.forEach(doc => {
            let score = doc.data();
            
            if(score.standard_ref) {            
              const scoreStandard = this.standards.find(function(standard) {
                return standard.id === score.standard_ref.id;
              });
              
              if (scoreStandard && score.met) {
                collection[i].points += scoreStandard.points;
              }
              
              if (scoreStandard && !score.met && scoreStandard.points == 3) {
                collection[i].met_status = "Not Met";
              }
            }
          });
        });        
      }
    }
  },
  async mounted() {       
    const db = firebase.firestore();

    db.doc('Stats/ReviewsByStatus').get()
    .then(result => {
      this.reviewStats = result.data();
    });

    db.doc('Stats/ProjectsByStatus').get()
    .then(result => {
      this.projectStats = result.data();
    });

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
        
        if(review.status === "In-Progress")
          this.addReviewToCollection(this.in_progress_reviews, review);
        
        if(review.status === "Complete")
          this.addReviewToCollection(this.completed_reviews, review);

      })}).catch(err => { console.error(err) });

    let querySnapshot = await db.collection("Standards").get();

    querySnapshot.forEach(doc => {
      let standard = {};
      standard.id = doc.id;
      standard.points = doc.data().points;
      this.standards.push(standard);
    });      
    
    this.tallyReviewScores(this.in_progress_reviews);
    this.tallyReviewScores(this.completed_reviews);
  }
};
</script>
 