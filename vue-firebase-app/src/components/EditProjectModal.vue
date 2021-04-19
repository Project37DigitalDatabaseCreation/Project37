<!--
* EditProjectModal.vue
*
* Description: Overview for Edit Project Modal,
* allows the user to edit an existing project.
*
-->

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Edit Project </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label
                  for="project_name"
                  class="col-md-4 col-form-label text-md-right"
                  >Project</label
                >

                <div class="col-md-6">
                  <input
                    id="project_name"
                    type="text"
                    class="form-control"
                    name="project_name"
                    value
                    required
                    v-model="update.value.title"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="project_description"
                  class="col-md-4 col-form-label text-md-right"
                  >Description</label
                >

                <div class="col-md-6">
                  <input
                    id="project_description"
                    type="text"
                    class="form-control"
                    name="project_description"
                    height="350"
                    value
                    required
                    autofocus
                    v-model="update.value.description"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="organization_name"
                  class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >

                <div class="col-md-6">
                  <select
                    id="organization_name"
                    class="form-control"
                    name="organization_name"
                    required
                    v-model="update.value.organization"
                    v-on:change="clearSelectedClients"
                  >
                    <option
                      v-for="organization in organizations"
                      :value="organization.title"
                      :key="organization.id"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="client_names"
                  class="col-md-4 col-form-label text-md-right"
                  >Clients</label
                >
                <div class="col-md-6">
                  <multiselect
                    :v-model="update.value.clients"
                    :options="clients"
                    :value="selectedClients"
                    @select="updateSelected"
                    @deselect="updateSelected"
                    @open="openOptions"
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
              <div class="form-group row">
                <label
                  for="project_status"
                  class="col-md-4 col-form-label text-md-right"
                  >Status</label
                >
                <div class="col-md-6">
                  <select
                    id="project_status"
                    class="form-control"
                    name="project_status"
                    required
                    v-model="update.value.status"
                  >
                    <option
                      v-for="status in statusOptions"
                      :value="status"
                      :key="status"
                    >
                      {{ status }}
                    </option>
                  </select>
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit(), $emit('close')">
                Save
              </button>
              <button class="btn cancel" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive } from "vue";
import firebase from "firebase";
import modifyDocument from "../composables/modifyDocument";
import getCollection from "../composables/getCollection";
import Multiselect from "@vueform/multiselect";
export default {
  emits: ["close"],
  props: ["update_project"],
  components: {
    Multiselect,
  },
  setup(props) {
    const update = reactive({ ...props.update_project });
    const handleSubmit = async () => {
      const modified_project = {
        title: update.value.title,
        description: update.value.description,
        status: update.value.status,
        organization: update.value.organization,
        org_ref: firebase
          .firestore()
          .doc("/Organizations/" + update.value.org_ref),
        clients: update.value.clients,
      };
      modifyDocument("Projects", update.value.id).updateDoc(modified_project);
    };
    const { documents: organizations, error } = getCollection("Organizations");
    // loads the current organizations from firebase for the dropdown
    // menu when mounted
    //onMounted(loadOrganizations)
    return { update, organizations, error, handleSubmit };
  },
  data() {
    return {
      clients: [],
      clientObj: [],
      selectedClients: this.update.value.clients,
      statusOptions: ["New", "In Progress", "Complete"],
      exists: null,
    };
  },
  methods: {
    readClients() {
      this.clients = [];
      firebase
        .firestore()
        .collection("Clients")
        .where("organization", "==", this.update.value.organization)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            this.clients.push({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              organization: doc.data().organization,
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
        .where("title", "==", this.update.value.organization)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.organizationId.push({
              id: doc.id,
              title: doc.data().title,
            });
            this.update.value.org_ref = doc.id;
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
      this.update.value.clients = this.clientObj;
    },
    openOptions() {
      this.selectedClients = [];
      this.update.value.clients = [];
      this.clientObj = [];
    },
    checkIfExists(val) {
      this.exists = this.selectedClients.some((item) => {
        return val === item;
      });
    },
    clearSelectedClients() {
      this.selectedClients = [];
      this.update.value.clients = [];
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
<style scoped src="../assets/styles/styles.css"></style>