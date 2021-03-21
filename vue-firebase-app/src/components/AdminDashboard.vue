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
        <tr v-for="review in inProgressReviews" :key="review.id">
          <td>{{ review.org.title }}</td>
          <td>{{ review.course_name }}</td>
          <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName }}</td>
          <td>{{ review.project.title }}</td>
          <td>{{ review.points }}</td>
          <td>{{ review.met_status }}</td>
          <td><button @click="openReview(review.id)">Open</button></td>
        </tr>
      </tbody>          
    </table>
    <div v-if="in_progress_reviews.length > PAGE_SIZE">
      <button @click="prevInProgressPage" :disabled="in_progress_page === 1">Previous</button> 
      <button @click="nextInProgressPage" :disabled="in_progress_reviews.length <= in_progress_page * PAGE_SIZE">Next</button>
    </div>
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
        <tr v-for="review in completedReviews" :key="review.id">
          <td>{{ review.org.title }}</td>
          <td>{{ review.course_name }}</td>
          <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName }}</td>
          <td>{{ review.project.title }}</td>
          <td>{{ review.points }}</td>
          <td>{{ review.met_status }}</td>
          <td><button @click="openReview(review.id)">Open</button></td>
        </tr>
      </tbody>          
    </table>
    <div v-if="completed_reviews.length > PAGE_SIZE">
      <button @click="prevCompletedPage" :disabled="completed_page === 1">Previous</button> 
      <button @click="nextCompletedPage" :disabled="completed_reviews.length <= completed_page * PAGE_SIZE">Next</button>
    </div>  
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
      in_progress_page: 1,
      completed_page: 1,
      PAGE_SIZE: 10,
      error: null
    };
  },
  computed: {
    inProgressReviews: function() {
      return this.in_progress_reviews.filter((row, index) => {
        let start = (this.in_progress_page-1)*this.PAGE_SIZE;
        let end = this.in_progress_page*this.PAGE_SIZE;
        if(index >= start && index < end) return true;
      });
    },
    completedReviews: function() {
      return this.completed_reviews.filter((row, index) => {
        let start = (this.completed_page-1)*this.PAGE_SIZE;
        let end = this.completed_page*this.PAGE_SIZE;
        if(index >= start && index < end) return true;
      });
    }    
  },
  methods: {
    prevInProgressPage() {
      if(this.in_progress_page > 1) this.in_progress_page--;
    },
    nextInProgressPage() {
      if((this.in_progress_page*this.PAGE_SIZE) < this.in_progress_reviews.length) this.in_progress_page++;
    },
    prevCompletedPage() {
      if(this.completed_page > 1) this.completed_page--;
    },
    nextCompletedPage() {
      if((this.completed_page*this.PAGE_SIZE) < this.completed_reviews.length) this.completed_page++;
    },
    openReview(reviewId) {
      this.$router.push({ name: 'Review', params: { review: reviewId}});
    },
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

    await db.collection("Reviews").orderBy("modified", "desc").get()
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
 