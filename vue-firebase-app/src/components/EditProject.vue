<!--
* EditProject.vue
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
            <slot name="header">
              Edit Project
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label for="project_name" class="col-md-4 col-form-label text-md-right">Project</label>

                <div class="col-md-6">
                    <input
                    id="project_name"
                    type="text"
                    class="form-control"
                    name="project_name"
                    value
                    required
                    v-model="project.title"
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="project_description" class="col-md-4 col-form-label text-md-right">Description</label>

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
                    v-model="project.description"
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="organization_name" class="col-md-4 col-form-label text-md-right">Organization</label>

                <div class="col-md-6">
                    <select
                    id="organization_name"
                    class="form-control"
                    name="organization_name"
                    required
                    v-model="project.organization"
                    v-on:change="clearSelectedClients"
                    >
                    <option v-for="organization in organizations" :value="organization.title" :key="organization.id"> {{organization.title}}</option>
                    </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="client_names" class="col-md-4 col-form-label text-md-right">Clients</label>

                <div class="col-md-6">
                    <multiselect
                        :v-model="selectedClients"
                        :options="clients"
                        :value="selectedClients"
                        @select="updateSelected"
                        @deselect="updateSelected"
                        @open="updateSelected"
                        @close="updateSelected"
                        :multiple="true"
                        no-results-text="No Clients Found"
                        label="firstName"
                        track-by="firstName"
                        value-prop="firstName"
                        :show-labels="true"
                        :hide-selected="true"
                        :clearable="false"
                        :max=-1
                        :min=1
                        mode="tags"
                        :autofocus="true"
                        placeholder="Choose Client(s)"
                        ></multiselect>
                        
                </div>
              </div>

              <div class="form-group row">
                <label for="project_status" class="col-md-4 col-form-label text-md-right">Status</label>

                <div class="col-md-6">
                    <select
                    id="project_status"
                    class="form-control"
                    name="project_status"
                    required
                    v-model="project.status"
                    >
                    <option v-for="status in statusOptions" :value="status" :key="status">
                      {{ status}}
                    </option>
                    </select>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="saveEdit()">Save</button>
              <button class="btn cancel" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
 
<script>
import firebase from 'firebase'
import Multiselect from '@vueform/multiselect'
  export default {
    name: "EditProject",
    props: {
    selectedProject: Object,
    organizations: Array,
    },
    components: {
      Multiselect,
    },
    data() {
        return {
          project: this.selectedProject,
          statusOptions: ["New", "In Progress", "Complete"],
          clients: [],
          selectedClients: this.selectedProject.clients,
          exists: null
        };
      },
    methods: {
      saveEdit() {
        this.project.clients = this.selectedClients
        this.$emit("edit-project", this.project);
        this.$emit('close');
      },
      load(){
        this.selectedClients = this.project.clients;
      },
      loadSelected(){
        this.selectedClients = this.project.clients;
      },
      updateSelected(value) {
        this.checkIfExists(value)
        if (!this.exists) {
            this.selectedClients.push(value)
        }
        else {
          this.selectedClients.splice(this.selectedClients.indexOf(value), 1);
        }
      },
      checkIfExists(val) {
        this.exists = this.selectedClients.some((item) => {
          return val === item
        })
      },
      readClients() {
        this.clients = [];
        firebase.firestore().collection("Clients")
        .where("organization", "==", this.project.organization).get()
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
          this.getOrganizationId();
        })
        .catch((error) => {
          console.log("Error retrieving documents: ", error);
          });
        },
        clearSelectedClients(){
          this.selectedClients = []
          this.readClients();
        },
        getOrganizationId() {
                this.organizationId = [];
                firebase.firestore().collection("Organizations")
                .where("title", "==", this.project.organization).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.organizationId.push({
                            id: doc.id,
                            title: doc.data().title,
                        });
                        this.project.org_ref = doc.id
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

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.save { background-color: #4CAF50;} /* Green */
.cancel {background-color: #e7e7e7; color: black;} /* Gray */
</style>