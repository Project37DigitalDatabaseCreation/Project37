<template>
    <div style="display:flex;" :style="`height:${contentHeight}px`">
        <ReviewNav @go-to-item="goToItem"></ReviewNav>
        <ReviewForm v-if="ready" :currentLink="currentLink" :review="review"></ReviewForm>
    </div>
</template>
<script>
import ReviewForm from './ReviewForm'
import ReviewNav from './ReviewNav'
import { ref } from 'vue'
export default {
    setup() {
        const currentLink = ref(1)
        return { currentLink }
    },
    data() {
        return {
            ready: false,
            review: {
                course_name: null,
                status: null,
                created: null,
                updated: null,
                body: []
            }
        }
    },
    components: {
        ReviewForm,
        ReviewNav
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        generalStandards() {
            return this.$store.getters.generalStandards
        },
        sortedStandards() {
            return this.$store.getters.sortedStandards
        },
        standards() {
            return this.$store.getters.standards
        }
    },
    methods: {
        goToItem(item) {
            this.currentLink = item.genStandard.number
        }
    },
    watch: {
        sortedStandards(val) {
            //  Once our sorted standards gets set, we have to fix our body
            if (val) {
                for (let i = 0; i < this.sortedStandards.length; i++) {
                    //  Current sorted entry
                    let curr = { ...this.sortedStandards[i] }
                    console.log('curr', curr)
                    //  Current genstandard
                    let gen = curr.genStandard
                    //  Give the body at this index the corresponding data
                    this.review.body[i] = { genStandard: gen.number, standards: [] }
                    //  Populate the standards in that body
                    for (let j = 0; j < curr.standards.length; j++) {
                        let std = { ...curr.standards[j] }
                        console.log('STD', std)
                        //  Push it in
                        this.review.body[i].standards[j] = {
                            standard: std.number,
                            met: false
                        }
                    }
                }
                //  Finished
                this.ready = true
            }
        }
    }
}
</script>