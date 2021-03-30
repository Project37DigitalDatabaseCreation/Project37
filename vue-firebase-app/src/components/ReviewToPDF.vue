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
            orientation: 'p', 
            unit: 'in', 
            format: [612, 792]
        });        

        doc.setFontSize(8);

        doc.html(this.standards[0].annotation, {
            callback: function (doc) {
                doc.save("a4.pdf");
            },
            x: 10,
            y: 10
        });    
    }
}
</script>