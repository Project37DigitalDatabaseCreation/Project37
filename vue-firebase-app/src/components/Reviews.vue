<template>
    <div class="container scrollcontainer">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    async mounted() {
        //  TODO: Store all of our standards in local JSON file so it's easy to access, and only fetch again if they get updated
        //check reviews

        if (!this.$store.getters.reviews) this.$store.dispatch('fetchReviews')
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>