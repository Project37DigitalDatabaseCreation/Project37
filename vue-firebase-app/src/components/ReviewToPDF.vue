<template>
    <div>
        Testing the pdf conversion...
        <img width="428.25" height="168.5" src="../assets/logos/eLMACADEMICTransparent.png" hidden id="logo">
    </div>
</template>
<script>
import firebase from "firebase";
import { jsPDF } from "jspdf";
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['standards', 'generalStandards'])
    },
    methods: {
        async exportReviewToPDF(reviewId) {
            const db = firebase.firestore();
            let img = document.getElementById("logo");
            let reviewRef = db.doc("/Reviews/" + reviewId);
            let review = await reviewRef.get();
            let scores = await db.collection("Scores").where("review_ref", "==", reviewRef).get();

            if (!this.generalStandards || this.generalStandards.length === 0) {
                await this.$store.dispatch('fetchGeneralStandards');
            }

            if (!this.standards || this.standards.length === 0) {
                await this.$store.dispatch('fetchStandards');   
            }        

            let html = "<h5 style='width: 811px; margin-left: 5px; margin-top: 5px;'>Course: " + review.data().course_name + "</h3>";

            this.generalStandards.forEach(gs => {
                html += "<table style='width: 811px; font-size: 8px; margin-bottom: 5px'>";
                html += "<tr><td style='font-weight: bold; letter-spacing: 2px; letter-spacing: 2px;' colspan=2>Standard " + gs.number + ": " + gs.title + "</td></tr>";
                html += "<tr><td style='font-weight: bold; letter-spacing: 2px;'>Specific Standards</td><td style='font-weight: bold; letter-spacing: 2px;'>Reviewer Recommendations</td></tr>";

                this.standards.forEach(s => {
                    let score;
                    if (s.general_standard_ref.id === gs.id) {
                        score = scores.docs.find(element => {
                            return (s.id === element.data().standard_ref.id);
                        });

                        html += "<tr><td style='text-align: left;'>" + gs.number + "." + s.number + " " + s.title;

                        if (score) {
                            if (score.data().met) {
                                html += "<br/>Met</td><td>";
                            } else {
                                html += "<br/>Not Met</td><td>";
                            }
                            
                            if (score.data().comment) {
                                html += score.data().comment + "</td></tr>";
                            }

                            html += "</td></tr>";
                        } else {
                            html += "</td><td></td></tr>";
                        }                   
                    }
                });

                html += "</table>";
            });  

            const doc = new jsPDF({
                orientation: "p", 
                unit: "px", 
                format: "letter",
                hotfixes: ["px_scaling"]
            });

            doc.addImage(img, 'PNG', 5, 5, 250, 100, 'logo');

            doc.html(html, {
                callback: function (doc) {
                    doc.save("review.pdf");
                },
                x: 5,
                y: 100
            }); 
        }
    },
    mounted() {
        this.exportReviewToPDF("WaHS87NBJYclmNsnWrMu");        
    }
}
</script>