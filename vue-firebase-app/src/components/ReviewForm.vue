<template>
    <div v-if="loading && !sortedStandards"
        style="display:flex; justify-content:center; align-items:center; width:100%;">
        <div class="loader"></div>
    </div>
    <div v-else class="col-9 no-gutters px-0">
        <div class="justify-content-center">
            <div class="col-md-12" style="padding:0 !important;">
                <div class="card">
                    <div class="card-header">Quality Review Form</div>
                    <div class="card-body"
                        style="overflow:auto; background-color:#f1f1f1;"
                        :style="`height:${cardHeight}px;`">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form v-if="sortedStandards" action="#"
                            @submit.prevent="saveProgress">

                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Course Name
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <input v-if="currReview" id="fname" type="text"
                                        class="form-control" name="fname" value required
                                        autofocus v-model="currReview.course_name" />
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#f8f8f8;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Project
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#f8f8f8;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Organization
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#f8f8f8;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Reviewer
                                </div>
                            </div>

                            <template v-for="(item, i) in sortedStandards" :key="i">
                                <div class="form-group row" :id="item.genStandard.number"
                                    style="background-color:#f8f8f8;">

                                    <div
                                        style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                        {{ `${item.genStandard.number}. ${item.genStandard.title}` }}
                                    </div>

                                    <template
                                        v-for="(standard, j) in sortedStandards[i].standards"
                                        :key="i + '-' + j">
                                        <div class="standard-container col-12 px-0 mb-1"
                                            style="display:flex; border-bottom:1px solid grey; background-color:#ffffff; flex-direction:column;"
                                            :style="j == sortedStandards[i].standards.length - 1 ? 'border-bottom:unset !important;' : ''">
                                            <div class="standard-container-title col-12 px-0"
                                                style="display:flex; font-size:12px; color:rgba(0,0,0,.6);">
                                                <div class="col-1 px-0"
                                                    style="justify-content:center; align-items:center; text-align:center;">
                                                    MET</div>
                                                <div class="col-9 px-0">Standard
                                                    {{ `${item.genStandard.number}.${standard.number}` }}
                                                </div>
                                                <div class="col-2 px-0"
                                                    style="text-align:center;">Points
                                                </div>
                                            </div>
                                            <div class="standard-container-body col-12 px-0"
                                                style="display:flex;">
                                                <div class="col-1 px-0"
                                                    style="justify-content:center; align-items:center; display:flex;">
                                                    <input v-if="currReview" id="st-1"
                                                        type="checkbox" name="MET"
                                                        v-model="currReview.body[i].standards[j].met" />
                                                </div>
                                                <div class="col-9 col-form-label px-0">
                                                    {{ standard.title }}</div>
                                                <div class="col-2 px-0"
                                                    style="justify-content:center; align-items:center; display:flex;">
                                                    {{ standard.met ? standard.points : 0 }}
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="col-12 pr-0 py-4 pl-3"
                                        style="justify-content:center; align-items:center; text-align:center; font-weight:bold; font-size:18px;"
                                        :style="`background-color:${standardMet(i) ? 'rgb(213, 232, 212);' : 'rgb(232, 213, 212)' }`">
                                        Standard Met: {{ standardMet(i) ? 'Yes' : 'No' }}
                                    </div>
                                </div>
                            </template>

                            <div class="form-group row mb-0">
                                <div class="col-12 px-0">
                                    <button type="submit" class="btn btn-primary"
                                        style="width:100%;">Save Progress</button>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-12 px-0">
                                    <button class="btn btn-primary" style="width:100%;"
                                        @click="saveComplete">Save as Complete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import _ from 'lodash'
export default {
    props: {
        currentLink: {
            type: Number,
            default: 1
        },
        edit: {
            type: Boolean,
            default: false
        },
        review: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            currReview: null,
            error: null
        }
    },
    mounted() {
        //  Once review prop is here we do this
        this.currReview = _.cloneDeep(this.review)
        console.log('CONTENT HEIGHT', this.contentHeight)
    },
    computed: {
        cardHeight() {
            return this.contentHeight - 49
        },
        loading() {
            return this.$store.getters.loading
        },
        sortedStandards() {
            return this.$store.getters.sortedStandards
        }
    },
    methods: {
        pointsGiven(std, i, j) {
            console.log('std', std, i, j)
        },
        standardMet(idx) {
            //  We calculate if a standard is met, by looking at the met value of every standard at idx i, from 0 to max
            for (let i = 0; i < this.sortedStandards[idx].standards.length; i++) {
                //  Container for our current
                let curr = this.sortedStandards[idx].standards[i]
                //  If this does not have the standard met, return false
                if (!curr.met) return false
            }
            //  Else return true
            return true
        },
        //  This gets triggered to save it as COMPLETE
        async saveComplete() {
            //  Create a clone of our sorted standards so we can operate on it
            const payload = _.cloneDeep(this.currReview)

            const timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate()

            console.log('timestamp', timestamp)

            //  IF we are editing then update updated at, otherwise update both updated and created
            if (this.edit) payload.updated_at = timestamp
            else {
                payload.updated = timestamp
                payload.created = timestamp
            }

            console.log('yee', payload)

            //  ITs in progress so set status to incomplete
            payload.status = 'INCOMPLETE'

            //  For now, lets just store these as documents in a collection called "savedReviews"
            const res = await firebase.firestore().collection('Reviews').add(payload)

            console.log('Added document with id: ', res.id)

            this.$router.push('/reviews')
        },
        //  This gets triggered to save it as INCOMPLETE
        async saveProgress() {
            //  Create a clone of our sorted standards so we can operate on it
            const payload = _.cloneDeep(this.currReview)

            const timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate()

            console.log('timestamp', timestamp)

            //  IF we are editing then update updated at, otherwise update both updated and created
            if (this.edit) payload.updated_at = timestamp
            else {
                payload.updated = timestamp
                payload.created = timestamp
            }

            console.log('yee', payload)

            //  ITs in progress so set status to complete
            payload.status = 'COMPLETE'

            //  For now, lets just store these as documents in a collection called "savedReviews"
            const res = await firebase.firestore().collection('Reviews').add(payload)

            console.log('Added document with id: ', res.id)
        }
    },
    watch: {
        currentLink(val) {
            if (val) {
                let element = document.getElementById(val)
                element.scrollIntoView(true)
            }
        },
        currReview: {
            deep: true,
            handler() {
                console.log('CURR REVIEW', this.currReview)
            }
        }
    }
}
</script>
<style scoped>
.card {
    width: 100%;
}
.form-group {
    border-radius: 4px 4px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
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
/* TODO: Add in breakpoints for the width */
</style>