<template>
<div class="container">
    <div class="row justify-content-center">
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
        
    }
}
</script>