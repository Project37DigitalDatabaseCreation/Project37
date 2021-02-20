<template>
    <div style="display:flex;" :style="`height:${contentHeight}px`">
        <ReviewNav @go-to-item="goToItem"></ReviewNav>
        <ReviewForm v-if="ready" :currentLink="currentLink" :edit="review ? true : false"
            :review="selectedReview">
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
            updated: null,
            body: []
        })
        const selectedReview = reactive(null)
        return { currentLink, ready, reviewTemplate, selectedReview }
    },
    async mounted() {
        console.log('REVIEW', this.review)
        //  If we have a review string, we are editing so fetch our review
        if (this.review) {
            //  Get our review
            let temp = await firebase
                .firestore()
                .collection('Reviews')
                .doc(this.review)
                .get()
            //  If this review exists, use it
            if (temp) {
                this.selectedReview = temp.data()
                this.selectedReview.id = this.review
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
            //  Once our sorted standards gets set, we have to fix our body
            for (let i = 0; i < this.sortedStandards.length; i++) {
                //  Current sorted entry
                let curr = { ...this.sortedStandards[i] }
                console.log('curr', curr)
                //  Current genstandard
                let gen = curr.genStandard
                //  Give the body at this index the corresponding data
                this.reviewTemplate.body[i] = {
                    genStandard: gen.number,
                    standards: []
                }
                //  Populate the standards in that body
                for (let j = 0; j < curr.standards.length; j++) {
                    let std = { ...curr.standards[j] }
                    console.log('STD', std)
                    //  Push it in
                    this.reviewTemplate.body[i].standards[j] = {
                        standard: std.number,
                        met: false
                    }
                }
            }
            //  Finished
            this.ready = true
            this.selectedReview = _.cloneDeep(this.reviewTemplate)
        },
        goToItem(item) {
            this.currentLink = item.genStandard.number
        }
    }
}
</script>