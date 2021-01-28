<template>
<div class="container">
    <div class="row justify-content-center" style="display:flex; width:100%;">
        <template v-for="(item, i) in reviews" :key="i">
            <div style="margin-top:10px; margin-bottom:10px; width:100%; text-align:center;"> Review Course Name: {{ item.course_name }} Reviewer Email: {{ item.reviewer_ref.email }}</div>
        </template>
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
        
    },
    computed: {
        reviews() {
            return this.$store.getters.reviews
        }
    }
}
</script>