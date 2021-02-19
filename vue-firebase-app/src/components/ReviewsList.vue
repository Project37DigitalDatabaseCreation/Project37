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
                        <th scope="col"></th>
                        <!-- <th scope="col"></th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="review in reviews" :key="review.id">
                        <td>{{ review.course_name }}</td>
                        <td>{{ review.reviewer.lastName + ", " + review.reviewer.firstName}}
                        </td>
                        <td>{{ review.status }}</td>
                        <td>
                            <button class="btn btn-primary" @click="goToEdit(review)">
                                Edit Review
                            </button>
                        </td>
                        <!-- <td><button class="btn btn-primary" @click="populatePopOut(review)">Edit</button></td>
                <td><button class="btn btn-primary" @click="deleteReview(review)">Delete</button></td> -->
                    </tr>
                </tbody>
            </table>
            <span v-if="sortedStandards"
                style="display:flex; justify-content:center; align-items:center; flex-direction:column;">
                <button class="btn btn-primary" @click="goToCreate">
                    Create Review
                </button>
            </span>
            <span v-else
                style="display:flex; justify-content:center; align-items:center; flex-direction:column;">
                <button class="btn btn-primary" :disabled="!ready">
                    Create Review
                </button>
                <div style="font-size:12px; margin-top:6px; color:grey;">We are getting
                    the standards right now, you can create a review once
                    they're all loaded.</div>
            </span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    computed: {
        reviews() {
            return this.$store.getters.reviews
        },
        sortedStandards() {
            return this.$store.getters.sortedStandards
        }
    },
    methods: {
        goToCreate() {
            //  Push the router
            console.log('reviewtemplate', this.selectedReview)
            this.$router.push({ name: 'Review' })
        },
        goToEdit(rev) {
            console.log('rev', rev.id)
            //  Push the router
            this.$router.push({ name: 'Review', params: { review: rev.id } })
        }
    }
}
</script>