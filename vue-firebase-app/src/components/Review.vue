<template>
    <div style="display:flex;" :style="`height:${contentHeight}px`">
        <ReviewNav @go-to-item="goToItem"></ReviewNav>
        <ReviewForm v-if="ready" :currentLink="currentLink" :edit="review ? true : false"
            :review="selectedReview" :scores="scores">
        </ReviewForm>
    </div>
</template>
<script>
import firebase from 'firebase'
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
        if (this.review) {
            //  Get our scores
            let temp = await firebase
                .firestore()
                .collection('Scores')
                .where('review_ref', '==', `/Reviews/${this.review}`)
                .get()

            //  We also have to get our review
            let review = await firebase.firestore().collection('Reviews').doc(this.review)
            //  If the review is set, set our selected, else just null
            this.selectedReview = review || null

            //  If these scores exist, use it
            if (temp) {
                //  Get each of our score documents
                temp.snapshot.docs.forEach(async (doc) => {
                    //  Our score
                    const score = doc.data()
                    //  We also have to get our standard
                    const std = score.standard_ref.get()
                    //  Add the standard to our score
                    score.standard = std.data()
                    score.standard.id = std.id
                    //  Append our id
                    score.id = doc.id
                    //  Push into our scores array
                    this.scores.push(score)
                })
                console.log('FINISHED', this.scores)
                //  Signal we are ready to go
                this.ready = true
            } else {
                this.createTemplate()
            }
        } else {
            this.createTemplate()
        }
    },
    computed: {
        sortedStandards() {
            return this.$store.getters.sortedStandards
        }
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
                            review_ref: null
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
            if (val && !this.scores.length && !this.review) this.createTemplate()
        }
    }
}
</script>