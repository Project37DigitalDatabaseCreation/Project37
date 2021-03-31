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
        ...mapGetters(['standards'])
    },
    async mounted() {
        if (!this.standards || this.standards.length === 0) {
            await this.$store.dispatch('fetchStandards');   
        }
        // Default export is a4 paper, portrait, using millimeters for units
        //const doc = new jsPDF();
        //doc.setFontSize(10);
        //doc.text("Hello world!", 10, 10);
        
        const doc = new jsPDF({
            orientation: "p", 
            unit: "px", 
            format: "letter",
            hotfixes: ["px_scaling"]
        });

        let html = "";

        this.standards.forEach(standard => {
            html += "<div style='width: 811px; font-size: 10px;'>" + standard.annotation + "</div>";
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