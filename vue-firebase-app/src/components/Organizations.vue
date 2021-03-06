<!--
* Organizations.vue
*
* Description: Provides a user with admin priveleges the ability
* to View, Create, Delete and Update organizations
*
-->

<template>
  <div class="container">
    <h1 class="mt-4 text-center">Organizations</h1>
    <span style="color: red">{{ error }}</span>
    <div>
      <button
        class="btn btn-primary"
        id="show-modal"
        @click="populatePopOut()">
          Add New Organization
        </button>
    </div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="org in organizations" :key="org.id">
          <td>{{ org.title }}</td>
          <td><button class="btn btn-primary" @click="populatePopOut(org)">Edit</button></td>
          <td><button class="btn btn-primary" @click="deleteOrg(org)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <!-- use the modal component, pass in the prop -->
    <modal
      v-if="showModal"
      v-on:edit-org="submitEdit"
      :selected_org="this.selected_org"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import firebase from "firebase";
import modal from "@/components/EditOrganization";
import { mapGetters } from 'vuex'

export default {
  name: "Organizations",
  components: {
    modal
  },
  data() {
    return {
      showModal: false,
      selected_org: null,
      error: null
    };
  },
  mounted() {
    // Get all of the organizations    
    this.$store.dispatch('fetchOrganizations')
  },
  computed: {
    ...mapGetters(['organizations'])
  },
  methods: {
    populatePopOut(org) {
      if(org) {
        // create a copy of the object to send to the popuout
        // so as to avoid the table showing the new values as
        // they are entered
        this.selected_org = Object.assign({}, org);
      } else {
        // pass an empty review object to hold the data
        this.selected_org = {};
      }
      
      this.error = null;
      this.showModal = true;
    },
    submitEdit(org) {
      let Vue = this;
      Vue.error = null;

      firebase.firestore().collection("Organizations").doc(org.id).set({
        title: org.title
        })
      .then(function() {
        Vue.$store.dispatch('fetchOrganizations')
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    deleteOrg(org) {
      let Vue = this;
      let orgId = org.id;

      if(confirm("Are you sure you want to delete this organization?")) {
        let orgRef = firebase.firestore().doc("/Organizations/" + orgId);

        firebase.firestore().collection("Projects")
        .where("org_ref", "==", orgRef).get()
        .then(result => {
          if (result.size > 0) {
            Vue.error = "The selected organization cannot be deleted because there are one or more projects associated with it.";
          } else {
            firebase.firestore().collection("Clients")
            .where("org_ref", "==", orgRef).get()
            .then(result => {
              if (result.size > 0) {
                Vue.error = "The selected organization cannot be deleted because there are one or more clients associated with it.";
              } else {
                firebase.firestore().collection("Organizations").doc(orgId).delete().then(() => {
                  console.log("Document successfully deleted!");
                  Vue.error = null;
                  Vue.$store.dispatch('fetchOrganizations');
                });
              }
            }).catch((error) => {
              console.error("Error removing document: ", error);
            });
          }
        }).catch(err => { console.error(err) });
      }      
    }
  }
};
</script>