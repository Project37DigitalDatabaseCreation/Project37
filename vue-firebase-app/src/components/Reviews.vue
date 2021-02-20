<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    async mounted() {
        //  TODO: Store all of our standards in local JSON file so it's easy to access, and only fetch again if they get updated
        //check reviews

        await this.$store.dispatch('fetchReviews')
        console.log('reviews', this.reviews)

        //  Fetching our standards and sorting them takes a long time because we have so many of them so we should get them now
        //  instead of waiting until the user clicks on "Create Review" and has to wait until they all load in
        this.$store.dispatch('sortStandards')
    }
}
</script>