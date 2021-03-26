<template>
    <div class="container scrollcontainer" style="display:flex;" :style="`height:${contentHeight}px`">
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
            //  We have to grab the review that the id points to
            const rev = firebase.firestore().collection('Reviews').doc(this.review)

            //  Get our scores
            const temp = await firebase
                .firestore()
                .collection('Scores')
                .where('review_ref', '==', rev)
                .get()

            //  We also have to get our review
            const review = await firebase
                .firestore()
                .collection('Reviews')
                .doc(this.review)

            //  If the review is set, set our selected, else just null
            this.selectedReview = review || null

            //  If these scores exist, use it
            if (temp) {
                //  Get each of our score documents
                for (let i = 0; i < temp.docs.length; i++) {
                    //  Get the current document
                    let doc = temp.docs[i]
                    //  Our score
                    const score = doc.data()
                    //  We also have to get our standard
                    const std = await score.standard_ref.get()
                    //  Add the standard to our score
                    score.standard = std.data()
                    score.standard.id = std.id

                    //  Get the general standard on this standard
                    const gen = await score.standard.general_standard_ref.get()
                    //  Add the general standard to our standard
                    score.standard.generalStandard = gen.data()
                    score.standard.generalStandard.id = gen.id
                    //  Append our id
                    score.id = doc.id
                    //  Push into our scores array
                    this.scores.push(score)
                }
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
            //  Create our template once we have standards AND there's no scores/review (create)
            if (val && !this.scores.length && !this.review) this.createTemplate()
        }
    }
}
</script>
<style scoped>
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