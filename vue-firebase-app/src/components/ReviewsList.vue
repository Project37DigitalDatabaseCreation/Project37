<template>
    <div class="container scrollcontainer">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">All Reviews</div>
                <table class="table">
                    <thead class="project-head">
                        <tr>
                            <th>Course Name</th>
                            <th>Reviewer</th>
                            <th>Status</th>
                            <th>Points</th>
                            <th></th>
                        </tr>
                    </thead>
                    <div v-if="loading"
                        style="display:flex; justify-content:center; align-items:center; width:100%;">
                        <div class="loader"></div>
                    </div>
                    <tbody v-else class="project-body">
                        <tr v-for="review in reviews" :key="review.id">
                            <td>{{ review.course_name }}</td>
                            <td>
                                {{ reviewerName(review) }}
                            </td>
                            <td>{{ review.status }}</td>
                            <td>{{ review.points }}</td>
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
                    <div style="font-size:12px; margin-top:6px; color:grey;">We are
                        getting
                        the standards right now, you can create a review once
                        they're all loaded.</div>
                </span>
            </div>
        </div>
    </div>
    <router-view></router-view>
    </div>
</template>
<script>
export default {
    computed: {
        loading() {
            return this.$store.getters.loading
        },
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
        },
        reviewerName(review) {
            if (!review.reviewer) return ''
            return review.reviewer.lastName + ', ' + review.reviewer.firstName
        }
    }
}
</script>

<style scoped src="../assets/styles/styles.css"></style>