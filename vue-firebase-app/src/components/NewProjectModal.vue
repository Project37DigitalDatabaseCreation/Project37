<!--
* NewProjectModal.vue
*
* Description: Overview for New Project Landing Page
* allows the user to create a new project with multiple clients.
*
-->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> New Project</slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Title</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Title"
                    v-model="title"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Description</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Last Name"
                    v-model="description"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >
                <div class="col-md-6">
                  <select
                    class="form-control"
                    required
                    v-model="organization"
                    v-on:change="clearSelectedClients"
                  >
                    <option
                      v-for="organization in organizations"
                      v-bind:key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Clients</label
                >
                <div class="col-md-6">
                  <multiselect
                    :v-model="clients"
                    :options="newClients"
                    :value="selectedClients"
                    @select="updateSelected"
                    @deselect="updateSelected"
                    @open="updateSelected"
                    @close="updateSelected"
                    :show-options="true"
                    :caret="true"
                    :multiple="true"
                    :clear="true"
                    no-results-text="No Clients Found"
                    label="firstName"
                    track-by="firstName"
                    value-prop="email"
                    :show-labels="true"
                    :hide-selected="true"
                    :clearable="true"
                    :max="-1"
                    :min="1"
                    :limit="-1"
                    mode="tags"
                    :autofocus="true"
                    placeholder="Choose Client(s)"
                    ref="multiselect"
                  ></multiselect>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit(), $emit('close')">
                Save
              </button>
              <button class="btn cancel" @click="$emit('close')">Cancel</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import { ref } from "vue";
import getCollection from "../composables/getCollection";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  setup() {
    const title = ref("");
    const description = ref("");
    const organization = ref("");
    const org_ref = ref("");
    const clients = ref("");
    const num_reviews = ref("");
    const status = ref("");

    const { documents: organizations, error } = getCollection("Organizations");

    const handleSubmit = async () => {
      const newProject = {
        title: title.value,
        description: description.value,
        organization: organization.value,
        org_ref: firebase.firestore().doc("/Organizations/" + org_ref.value),
        clients: clients.value,
        num_reviews: 0,
        status: "New",
      };
      await firebase.firestore().collection("Projects").add(newProject);
    };
    return {
      organizations,
      error,
      handleSubmit,
      title,
      description,
      organization,
      org_ref,
      clients,
      num_reviews,
      status,
    };
  },
  data() {
    return {
      newClients: [],
      selectedClients: [],
      clientObj: [],
      exists: null,
    };
  },
  methods: {
    readClients() {
      this.newClients = [];
      firebase
        .firestore()
        .collection("Clients")
        .where("organization", "==", this.organization)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            this.newClients.push({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
            });
          });
          this.getOrganizationId();
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
    getOrganizationId() {
      this.organizationId = [];
      firebase
        .firestore()
        .collection("Organizations")
        .where("title", "==", this.organization)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.organizationId.push({
              id: doc.id,
              title: doc.data().title,
            });
            this.org_ref = doc.id;
          });
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
        });
    },
    updateSelected(value) {
      this.checkIfExists(value);
      if (!this.exists) {
        if (value != null) {
          this.selectedClients.push(value);
        }
      } else {
        this.selectedClients.splice(this.selectedClients.indexOf(value), 1);
      }
      this.getClientInfo();
      this.clients = this.clientObj;
    },
    checkIfExists(val) {
      this.exists = this.selectedClients.some((item) => {
        return val === item;
      });
    },
    clearSelectedClients() {
      this.selectedClients = [];
      this.clients = [];
      this.readClients();
    },
    getClientInfo() {
      this.clientObj = [];
      var i = 0;
      var len = this.selectedClients.length;
      for (; i < len; ) {
        firebase
          .firestore()
          .collection("Clients")
          .where("email", "==", this.selectedClients[i])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.clientObj.push({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email,
              });
            });
          })
          .catch((error) => {
            console.log("Error retrieving documents: ", error);
          });
        i++;
      }
    },
  },
  created() {
    this.readClients();
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>