<template>
    <div v-if="!currScores || !generalStandards || loading" style="display:flex; justify-content:center; align-items:center; width:100%; font-family: Calibri, Candara, Segoe, '
        Segoe UI', Optima, Arial, sans-serif;">
        <div class="loader"></div>
    </div>
    <div v-else class="col-9 no-gutters px-0">
        <div class="justify-content-center">
            <div class="col-md-12" style="padding:0 !important; font-family: Calibri, Candara, Segoe, 'Segoe
                UI', Optima, Arial, sans-serif">
                <div class="card" :style="`height:${contentHeight}px;`">
                    <div class="card-header" style="font-family: Calibri, Candara, Segoe, 'Segoe UI', Optima,
                        Arial, sans-serif; font-size: 1.5em;">
                        Quality Review Form</div>
                    <div class="card-body"
                        style="overflow:auto; background-color:#f1f1f1;"
                        :style="`height:${cardHeight}px;`">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <div v-if="generalStandards">
                            <div class="form-group row" style="background-color:#f8f8f8;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Project
                                </div>
                                <div
                                    style="display:flex; justify-content:center; align-items:center; width:100%; height:80px; padding-left:15px; padding-right:15px;">
                                    <select required v-model="currReview.project_ref"
                                        style="width:100%; height:40px; border-radius:4px;">
                                        <option v-for="project in projects"
                                            v-bind:key="project.id"
                                            v-bind:value="project.id">
                                            {{ project.title }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Course Name
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <input v-if="currReview" id="fname" type="text"
                                        class="form-control" name="fname" value required
                                        autofocus v-model="currReview.course_name"
                                        style="border-color:black !important;" />
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Course Code
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <input v-if="currReview" id="course_code" type="text"
                                        class="form-control" name="course_code" value
                                        required autofocus
                                        v-model="currReview.course_code"
                                        style="border-color:black !important;" />
                                </div>
                            </div>
                            <!-- <div class="form-group row" style="background-color:#f8f8f8;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Organization
                                </div>
                                <div
                                    style="display:flex; justify-content:center; align-items:center; width:100%; height:80px; padding-left:15px; padding-right:15px;">
                                    <select required v-model="currReview.organization_ref"
                                        style="width:100%; height:40px; border-radius:4px;">
                                        <option v-for="organization in organizations"
                                            v-bind:key="organization.id"
                                            v-bind:value="organization.id">
                                            {{ organization.title }}
                                        </option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Reviewer
                                </div>
                                <div
                                    style="display:flex; justify-content:center; align-items:center; width:100%; height:80px; padding-left:15px; padding-right:15px;">
                                    <select required v-model="currReview.reviewer_ref"
                                        style="width:100%; height:40px; border-radius:4px;">
                                        <option v-for="reviewer in reviewers"
                                            v-bind:key="reviewer.id"
                                            v-bind:value="reviewer.id">
                                            {{ reviewer.email }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Date of Review
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <input v-if="currReview" id="review_date" type="date"
                                        class="form-control" name="review_date" value
                                        required autofocus
                                        v-model="currReview.review_date"
                                        style="border-color:black !important;" />
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Status
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <input v-if="currReview" id="status" type="text"
                                        class="form-control" name="status" value required
                                        autofocus v-model="currReview.status"
                                        style="border-color:black !important;" />
                                </div>
                            </div>
                            <div class="form-group row" style="background-color:#ffffff;">
                                <div
                                    style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                    Executive Summary
                                </div>
                                <div class="col-12" style="padding-bottom:30px;">
                                    <textarea v-if="currReview" id="exec_summary"
                                        class="form-control" name="exec_summary" value
                                        required autofocus
                                        v-model="currReview.exec_summary"
                                        style="border-color:black !important;" />
                                </div>
                            </div>

                            <template v-for="(item, i) in generalStandards" :key="i">
                                <div v-if="showGen(item)" class="form-group row"
                                    :id="item.number" style="background-color:#f8f8f8;">

                                    <div
                                        style="padding:10px; width:100%; background-color:#ffffff; border-radius:4px 4px; font-size:20px; font-weight:bold;">
                                        {{ `${item.number}. ${item.title}` }}
                                    </div>

                                    <template v-for="(score, j) in filteredScores(item)"
                                        :key="i + '-' + j">
                                        <div v-if="showStd(score)"
                                            class="standard-container col-12 px-0 mb-1"
                                            style="display:flex; border-bottom:1px solid grey; background-color:#ffffff; flex-direction:column;"
                                            :style="j == scores.length - 1 ? 'border-bottom:unset !important;' : ''">
                                            <div class="standard-container-title col-12 px-0"
                                                style="display:flex; font-size:14px; color:rgba(0,0,0,.6);">
                                                <button class="collapsible"
                                                    :id="`collapsible-${i}-${j}`"
                                                    style="display:flex; font-size:14px; color:rgba(0,0,0,.6);"
                                                    @click="expand(i,j)">

                                                    <div class="col-1 px-0"
                                                        style="justify-content:center; align-items:center; text-align:center; font-weight:bold;"
                                                        :style="`background-color:${score.met ? 'green' : ''}; color:${score.met ? 'white' : 'rgba(0,0,0,.6)'}`">
                                                        MET
                                                    </div>
                                                    <div class="col-10 pr-0"
                                                        style="font-weight:bold;">Standard
                                                        {{ `${item.number}.${score.standard.number}` }}
                                                    </div>
                                                    <div class="col-1 px-0"
                                                        style="text-align:center; font-weight:bold;">
                                                        Points:
                                                        {{ score.met ? score.standard.points : 0 }}
                                                    </div>
                                                    <!-- <div class="col-1 px-0"
                                                        style="text-align:center; font-weight:bold;">

                                                    </div> -->
                                                </button>
                                            </div>
                                            <span :id="`collapse-content-${i}-${j}`"
                                                class="collapse-content">
                                                <div class="standard-container-body col-12 px-0"
                                                    style="display:flex;">
                                                    <div class="col-1 px-0"
                                                        style="justify-content:center; align-items:center; display:flex;">
                                                        <input id="st-1" type="checkbox"
                                                            name="MET"
                                                            v-model="score.met" />
                                                    </div>
                                                    <div
                                                        class="col-11 col-form-label px-0">
                                                        {{ score.standard.title }}</div>
                                                </div>
                                                <div class="standard-container-comments col-12 px-0"
                                                    style="display:flex; justify-content:center; align-items:center; flex-direction:column; margin-bottom:10px;">
                                                    <div
                                                        style="width:100%; text-align:left; padding-left:15px;">
                                                        Comments</div>
                                                    <textarea cols="75" rows="6"
                                                        style="resize:none;"
                                                        v-model="score.comment" />
                                                </div>
                                            </span>
                                        </div>
                                    </template>
                                    <div class="col-12 pr-0 py-4 pl-3"
                                        style="justify-content:center; align-items:center; text-align:center; font-weight:bold; font-size:18px;"
                                        :style="`background-color:${standardMet(item) ? 'rgb(213, 232, 212);' : 'rgb(232, 213, 212)' }`">
                                        Standard Met:
                                        {{ standardMet(item) ? 'Yes' : 'No' }}
                                        <br />
                                        Total Points: {{ pointTotal(item) }}
                                    </div>
                                </div>
                            </template>

                            <div class="form-group row mb-0">
                                <div class="col-12 px-0">
                                    <button class="btn btn-primary" style="width:100%;"
                                        @click="saveProgress">Save Progress</button>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-12 px-0">
                                    <button class="btn btn-primary"
                                        style="width:100%; margin-top:5px;"
                                        @click="saveComplete">Save as Complete</button>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-12 px-0">
                                    <button class="btn btn-primary"
                                        style="width: 100%; margin-top:5px;"
                                        @click="exportReviewToPDF">
                                        Export to PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import _ from 'lodash'
import { jsPDF } from 'jspdf'
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
        },
        scores: {
            type: Array,
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
            currScores: null,
            error: null,
            projects: [],
            reviewers: []
        }
    },
    mounted() {
        this.getProjects()
        this.getReviewers()
        //  Once review prop is here we do this
        this.currReview = _.cloneDeep(this.review)
        //  Once scores prop is here we do this
        this.currScores = _.cloneDeep(this.scores)
    },
    computed: {
        cardHeight() {
            return this.contentHeight - 49
        },
        loading() {
            return this.$store.getters.loading
        },
        generalStandards() {
            return this.$store.getters.generalStandards
        },
        standards() {
            return this.$store.getters.standards
        }
    },
    methods: {
        expand(i, j) {
            let doc = document.getElementById(`collapse-content-${i}-${j}`)
            if (doc.style.maxHeight) doc.style.maxHeight = null
            else doc.style.maxHeight = doc.scrollHeight + 'px'
        },
        filteredScores(genStandard) {
            //  Filters our scores based on general standard
            const filtered = this.currScores.filter((x) => {
                return x.standard.generalStandard.id === genStandard.id
            })

            filtered.sort((a, b) => {
                return a.standard.number > b.standard.number ? 1 : -1
            })

            //  Order our scores
            return filtered
        },
        getProjects() {
            firebase
                .firestore()
                .collection('Projects')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.projects.push({
                            title: doc.data().title,
                            id: doc.id
                        })
                        console.log(doc.id, ' => ', doc.data())
                    })
                })
                .catch((error) => {
                    console.log('Error getting documents: ', error)
                })
        },
        getReviewers() {
            firebase
                .firestore()
                .collection('Reviewers')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.reviewers.push({
                            email: doc.data().email,
                            is_admin: doc.data().isAdmin,
                            id: doc.id
                        })
                        console.log(doc.id, ' => ', doc.data())
                    })
                })
                .catch((error) => {
                    console.log('Error getting documents: ', error)
                })
        },
        pointTotal(genStandard) {
            const scores = this.filteredScores(genStandard)

            let points = 0

            //  Iterate through these scores
            for (let i = 0; i < scores.length; i++) {
                //  Tally our scores
                if (scores[i].met) points += scores[i].standard.points
            }
            return points
        },
        //  This gets triggered to save it as COMPLETE
        async saveComplete() {
            //  Create a timestamp
            const timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate()
            //  Our payload is an object that is only 1D
            const payload = { updated: timestamp }
            //  If we have a review, we can populate it with those fields
            payload.exec_summary = this.currReview.exec_summary
            payload.course_name = this.currReview.course_name
            payload.course_code = this.currReview.course_code
            payload.review_date = this.currReview.review_date
            payload.created = this.currReview.created || timestamp
            payload.status = this.currReview.status || 'Complete'
            payload.id = this.currReview.id

            //  Get our reviewer document to be the reference
            payload.reviewer_ref = firebase
                .firestore()
                .doc(`/Reviewers/${this.currReview.reviewer_ref}`)

            //  Get our projet document to be the reference
            payload.project_ref = firebase
                .firestore()
                .doc(`/Projects/${this.currReview.project_ref}`)

            //  Container for our response
            let res = null

            //  IF we are editing, then update, don't create
            if (this.edit)
                res = await firebase
                    .firestore()
                    .collection('Reviews')
                    .doc(payload.id)
                    .update(payload)
            else res = await firebase.firestore().collection('Reviews').add(payload)

            //  Create all of our scores
            for (let i = 0; i < this.currScores.length; i++) {
                //  If we are editing, make sure we update
                if (this.edit) {
                    firebase
                        .firestore()
                        .collection('Scores')
                        .doc(this.currScores[i].id)
                        .update(this.currScores[i])
                }
                //  Else, we can just add it in as a new Score
                else {
                    //  Create our score to store
                    let score = {
                        standard_ref: firebase
                            .firestore()
                            .doc(`/Standards/${this.currScores[i].standard.id}`),
                        met: this.currScores[i].met,
                        review_ref: firebase.firestore().doc(`/Reviews/${res.id}`),
                        comment: this.currScores[i].comment
                    }
                    firebase.firestore().collection('Scores').add(score)
                }
            }

            //  Get our reviews again
            this.$store.dispatch('fetchReviews')

            this.$router.push('/reviews')
        },
        //  This gets triggered to save it as INCOMPLETE
        async saveProgress() {
            //  Create a timestamp
            const timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate()
            //  Our payload is an object that is only 1D
            const payload = { updated: timestamp }
            //  If we have a review, we can populate it with those fields
            payload.exec_summary = this.currReview.exec_summary
            payload.course_name = this.currReview.course_name
            payload.course_code = this.currReview.course_code
            payload.review_date = this.currReview.review_date
            payload.created = this.currReview.created || timestamp
            payload.status = this.currReview.status || 'In-Progress'
            payload.id = this.currReview.id

            //  Get our reviewer document to be the reference
            payload.reviewer_ref = firebase
                .firestore()
                .doc(`/Reviewers/${this.currReview.reviewer_ref}`)

            //  Get our projet document to be the reference
            payload.project_ref = firebase
                .firestore()
                .doc(`/Projects/${this.currReview.project_ref}`)

            //  Container for our response
            let res = null

            //  IF we are editing, then update, don't create
            if (this.edit)
                res = await firebase
                    .firestore()
                    .collection('Reviews')
                    .doc(payload.id)
                    .update(payload)
            else res = await firebase.firestore().collection('Reviews').add(payload)

            //  Create all of our scores
            for (let i = 0; i < this.currScores.length; i++) {
                //  If we are editing, make sure we update
                if (this.edit) {
                    firebase
                        .firestore()
                        .collection('Scores')
                        .doc(this.currScores[i].id)
                        .update(this.currScores[i])
                }
                //  Else, we can just add it in as a new Score
                else {
                    //  Create our score to store
                    let score = {
                        standard_ref: firebase
                            .firestore()
                            .doc(`/Standards/${this.currScores[i].standard.id}`),
                        met: this.currScores[i].met,
                        review_ref: firebase.firestore().doc(`/Reviews/${res.id}`)
                    }
                    firebase.firestore().collection('Scores').add(score)
                }
            }

            //  Get our reviews again
            this.$store.dispatch('fetchReviews')
        },
        showGen(std) {
            //  Return true if editing
            if (this.edit) return true
            //  Else, return based on is_active
            return std.is_active
        },
        showStd(score) {
            //  Return true if editing
            if (this.edit) return true
            //  Else, return based on is_active
            return score.standard.is_active
        },
        standardMet(genStandard) {
            //  Find all scores that match the genstandard id
            // let scores = this.currScores.filter((x) => {
            //     return x.standard.generalStandard.id === genStandard.id
            // })
            const scores = this.filteredScores(genStandard)

            //  Iterate through these scores
            for (let i = 0; i < scores.length; i++) {
                //  If the score hasn't been met, return false
                if (!scores[i].met) return false
            }
            return true
        },
        async exportReviewToPDF() {
            //const db = firebase.firestore();
            let img = document.getElementById('logo')
            //let reviewRef = db.doc("/Reviews/" + reviewId);
            //let review = await reviewRef.get();
            let review = _.cloneDeep(this.currReview)
            let scores = _.cloneDeep(this.currScores)
            //let scores = await db.collection("Scores").where("review_ref", "==", reviewRef).get();

            if (!this.generalStandards || this.generalStandards.length === 0) {
                await this.$store.dispatch('fetchGeneralStandards')
            }

            if (!this.standards || this.standards.length === 0) {
                await this.$store.dispatch('fetchStandards')
            }

            let html =
                "<h5 style='width: 811px; margin-left: 5px; margin-top: 5px; font-family: sans-serif;'>Course Name: " +
                review.course_name + "<br>" + "Course Code: " + review.course_code +
                "</h3>";

            this.generalStandards.forEach((gs) => {
                html +=
                    "<table style='width: 811px; font-size: 8px; margin-bottom: 5px; font-family: sans-serif;'>"
                html +=
                    "<tr><td style='font-weight: bold; letter-spacing: 2px; letter-spacing: 2px;' colspan=2>Standard " +
                    gs.number +
                    ': ' +
                    gs.title +
                    '</td></tr>'
                html +=
                    "<tr><td style='font-weight: bold; letter-spacing: 2px;'>Specific Standards</td><td style='font-weight: bold; letter-spacing: 2px;'>Reviewer Recommendations</td></tr>"

                this.standards.forEach((s) => {
                    let score
                    if (s.general_standard_ref.id === gs.id) {
                        score = scores.find((element) => {
                            return s.id === element.standard_ref.id
                        })

                        html +=
                            "<tr><td style='text-align: left;'><span style='font-weight: bold;'>" +
                            gs.number +
                            '.' +
                            s.number +
                            ' ' +
                            s.title +
                            '</span><br>' +
                            s.annotation

                        if (score) {
                            if (score.met) {
                                html += '<br/>Met</td><td>'
                            } else {
                                html += '<br/>Not Met</td><td>'
                            }

                            if (score.comment) {
                                html += score.comment + '</td></tr>'
                            }

                            html += '</td></tr>'
                        } else {
                            html += '</td><td></td></tr>'
                        }
                    }
                })

                html += '</table>'
            })

            const doc = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: 'letter',
                hotfixes: ['px_scaling']
            })

            doc.addImage(img, 'PNG', 5, 5, 250, 100, 'logo')

            doc.html(html, {
                callback: function (doc) {
                    doc.save('review.pdf')
                },
                x: 5,
                y: 100
            })
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
    font-family: Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif;
    width: 100%;
}
.collapsible {
    background-color: #eee;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}
.collapsible:hover {
    background-color: #ccc;
}
.collapse-content {
    /* display: none; */
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.2s ease-out;
}
.form-group {
    font-family: Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif;
    border-radius: 4px 4px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
}
/* Save/View Button */
.save {
    font-size: 1em;
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    background-color: #49703b;
}
/* TODO: Add in breakpoints for the width */
</style>