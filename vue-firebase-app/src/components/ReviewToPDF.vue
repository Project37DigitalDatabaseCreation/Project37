<template>
    <div>
        Testing the pdf conversion...
    </div>
</template>
<script>
import { jsPDF } from "jspdf";
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['standards', 'generalStandards'])
    },
    async mounted() {
        if (!this.generalStandards || this.generalStandards.length === 0) {
            await this.$store.dispatch('fetchGeneralStandards');
        }

        if (!this.standards || this.standards.length === 0) {
            await this.$store.dispatch('fetchStandards');   
        }
        
        const doc = new jsPDF({
            orientation: "p", 
            unit: "px", 
            format: "letter",
            hotfixes: ["px_scaling"]
        });

        let html = "";

        this.generalStandards.forEach(gs => {
            html += "<table style='width: 811px; font-size: 8px; margin-bottom: 5px'>";
            html += "<tr><td style='font-weight: bold; letter-spacing: 2px; letter-spacing: 2px;' colspan=2>Standard " + gs.number + ": " + gs.title + "</td></tr>";
            html += "<tr><td style='font-weight: bold; letter-spacing: 2px;'>Specific Standards</td><td style='font-weight: bold; letter-spacing: 2px;'>Reviewer Recommendations</td></tr>";

            this.standards.forEach(s => {
                if (s.general_standard_ref.id === gs.id) {
                    html += "<tr><td>" + gs.number + "." + s.number + " " + s.title + "</td><td>recommendations placeholder</td></tr>";
                }
            });

            html += "</table>";
        });  

        doc.html(html, {
            callback: function (doc) {
                doc.save("review.pdf");
            },
            x: 5,
            y: 5
        });    
    }
}
</script>