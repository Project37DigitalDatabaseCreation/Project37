<template>
    <div class="container" style="display:flex;"
        :style="`height:${contentHeight}px; max-width:100% !important; min-width:100% !important; padding:0 !important; margin:0 !important;`">
        <ReviewNav @go-to-item="goToItem"></ReviewNav>
        <ReviewForm v-if="ready" :currentLink="currentLink" :edit="review ? true : false"
            :review="selectedReview" :scores="scores">
        </ReviewForm>
        <div v-else
            style="display:flex; justify-content:center; align-items:center; width:100%;">
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ReviewForm from './ReviewForm'
import ReviewNav from './ReviewNav'
import _ from 'lodash'
import { reactive } from 'vue'
import { ref } from 'vue'
export default {
    props: {
        review: {
            type: String,
            default: null
        }
    },
    setup() {
        const currentLink = ref(1)
        const ready = ref(false)
        const reviewTemplate = reactive({
            course_name: null,
            course_code: null,
            status: null,
            created: null,
            updated: null
        })
        const scores = reactive([])
        const selectedReview = reactive(null)
        return { currentLink, ready, reviewTemplate, scores, selectedReview }
    },
    async mounted() {
        console.log('REVIEW', this.review)
        //  If we have a review string, we are editing so fetch our scores
        if (this.review && this.reviews) {
            //  Grab our review from the store matching this review
            const review = this.reviews.find((x) => x.id === this.review)

            //  If the review is set, set our selected, else just null
            this.selectedReview = review || null

            //  If the review is set, we are ready to go
            if (this.selectedReview) {
                //  Set scores equal to our selected review scores
                this.scores = this.selectedReview.scores
                this.ready = true
                return
            } else {
                this.createTemplate()
            }
        } else {
            this.createTemplate()
        }
    },
    computed: {
        ...mapGetters(['generalStandards', 'reviews', 'sortedStandards', 'standards'])
    },
    components: {
        ReviewForm,
        ReviewNav
    },
    methods: {
        createTemplate() {
            if (this.sortedStandards) {
                //  Iterate through each general standard
                for (let i = 0; i < this.sortedStandards.length; i++) {
                    //  Then iterate through each regular standard
                    for (let j = 0; j < this.sortedStandards[i].standards.length; j++) {
                        //  Placeholder for current standard
                        let curr = this.sortedStandards[i].standards[j]
                        //  Create our score item
                        let score = {
                            standard: _.cloneDeep(curr),
                            met: false,
                            review_ref: null,
                            comment: ''
                        }
                        //  Push onto our array
                        this.scores.push(score)
                    }
                }
                console.log('FINISHED', this.scores)

                //  Finished
                this.selectedReview = _.cloneDeep(this.reviewTemplate)
                this.ready = true
            }
        },
        goToItem(item) {
            this.currentLink = item.genStandard.number
        }
    },
    watch: {
        sortedStandards(val) {
            //  Create our template once we have standards AND there's no scores/review (create)
            if (val && !this.scores.length && !this.review) this.createTemplate()
        }
    }
}
</script>
<style scoped>
.container {
    padding: 0 !important;
}
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>