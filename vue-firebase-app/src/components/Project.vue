<!--
* Project.vue
*
* Description: Overview for Project Landing Page
* allows the user to create a new project or 
* review existing projects.
*
-->
<template>
  <div class="example">
    <div class="output">Selected Clients: {{selectedClients}}</div>
    <multiselect :options="clients" :value="selectedClients"  @select="updateSelected" :multiple="true" label="firstName" track-by="firstName" value-prop="firstName"
    :show-labels="true" :close-on-select="true" placeholder="Choose Client(s)"></multiselect>
  </div>
</template>

<script>
    import firebase from 'firebase'
    import Multiselect from '@vueform/multiselect'
    export default {
        components: {
            Multiselect,
            },
        data() {
            return {
                clients: [],
                selectedClients: [],
                }
            },
        methods: {
            updateSelected(value) {
                this.selectedClients.push(value)
            },
            readClients() {
                this.clients = [];
                firebase.firestore().collection("Clients")
                .get()
                .then((result) => {
                    result.forEach((doc) => {
                        this.clients.push({
                            id: doc.id,
                            email: doc.data().email,
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            organization: doc.data().organization,
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error retrieving documents: ", error);
                });
            },
        },
        created() {
            this.readClients();
        },
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>