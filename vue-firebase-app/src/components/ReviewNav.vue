<template>
    <div style="position:fixed; height:100%; background-color:#333333; width:200px;">
        <div>
            <template v-for="(item, i) in listItems" :key="i">
                <div class="mb-5 mt-5" style="color:white; text-align:center;" :style="selectedIndex === i ? 'background-color:#D5E8D4;' : ''" @click="selectedIndex = i">
                    <router-link :to="`${$route.path}#${item.link}`" style="color:white;" :style="selectedIndex === i ? 'color:black !important;' : ''">{{ item.title }}</router-link>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { ref } from 'vue'
export default {
    setup() {
        const listItems = reactive([
                {
                    title: 'Course Overview and Introduction',
                    link: 'course',
                    selected: false
                },
                {
                    title: 'Learning Objectives (Competencies)',
                    link: 'comp',
                    selected: false
                },
                {
                    title: 'Assessment and Measurement',
                    link: 'assess',
                    selected: false
                },
                {
                    title: 'Instructional Materials',
                    link: 'instruct',
                    selected: false
                },
                {
                    title: 'Learning Activities and Learner Interaction',
                    link: 'learn',
                    selected: false
                },
                {
                    title: 'Course Technology',
                    link: 'tech',
                    selected: false
                },
                {
                    title: 'Learner Support',
                    link: 'support',
                    selected: false
                },
                {
                    title: 'Accessibilty and Usability',
                    link: 'usable',
                    selected: false
                }
            ]);
        const selectedIndex = ref(-1);
        const loading = ref(false)
        return { loading, listItems, selectedIndex }
    },
    async mounted() {
        //  Enable loading while we are processing this stuff
        this.loading = true

        //  Grab the general standards
        await this.$store.dispatch('fetchGeneralStandards')

        //  Disable loading now
        this.loading = false
    },
    computed: {
        generalStandards() {
            return this.$store.getters.generalStandards
        }
    },
    methods: {
        async sortStandards() {
            //  Create an array of objects with the titles corresponding to the general standard
            for (let i = 0; i < this.generalStandards.length; i++) {
                this.sortedStandards[i] = { genStandard: this.generalStandards[i], standards: [] }
            }

            // console.log('basic', this.standardsCount)
            for (let i = 0; i < this.standards.length; i++) {
                //  For each standard, slot it into the correct position in our sorted standards
                //  We determine this based on the generalStandard.number, which is +1 of the index
                // console.log('standardsssss', this.standards[i])
                // console.log('sortedstand', this.sortedStandards)
                this.sortedStandards[this.standards[i].generalStandard.number - 1].standards.push(this.standards[i])
            }

            console.log('sorted', this.sortedStandards)
        }
    }
}
</script>