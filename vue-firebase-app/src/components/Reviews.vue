<template>
<div class="container">
    <div class="row justify-content-center mt-4" style="display:flex; width:100%;">
        <h4>All Reviews</h4>
        <table class="table mt-1">
            <thead>
                <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Reviewer</th>
                <th scope="col">Status</th>
                <!-- <th scope="col"></th>
                <th scope="col"></th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="review in reviews" :key="review.id">
                <td>{{ review.course_name }}</td>
                <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName}}</td>
                <td>{{ review.status }}</td>
                <!-- <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
                <td><button class="btn btn-primary" @click="deleteReview(review)">Delete</button></td> -->
                </tr>
            </tbody>
        </table>   
        <button class="btn btn-primary">
            <router-link to="/review" class="review-link" style="color:white;">Create Review</router-link>
        </button>
    </div>
</div>
</template>
<script>
export default {
    async mounted() {
        //  TODO: Store all of our standards in local JSON file so it's easy to access, and only fetch again if they get updated
        //check reviews
        
        await this.$store.dispatch('fetchReviews')
        console.log('reviews',this.reviews)

        //  Fetching our standards and sorting them takes a long time because we have so many of them so we should get them now
        //  instead of waiting until the user clicks on "Create Review" and has to wait until they all load in
        this.$store.dispatch('sortStandards')
    },
    computed: {
        reviews() {
            return this.$store.getters.reviews
        }
    }
}
</script>