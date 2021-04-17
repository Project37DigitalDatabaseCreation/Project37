<!--
* ClientModifyModal.vue
*
* Description: Provides a modal window to allow an admin user
* to edit a client
*
* the following fields: First Name, Last Name, Email, and Organization
*
* Organization is a drop down: relies on project being created.
-->

<template>
  <transition
    name="modal"
    style="font-size: 0.68em; font-family: Calibri;"
  >
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Edit Client </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label
                  class="col-md-4 col-form-label text-md-right font-size: 1.1em"
                  >First Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="First Name"
                    v-model="update.value.firstName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    value
                    required
                    placeholder="Last Name"
                    v-model="update.value.lastName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >
                <div class="col-md-6">
                  <input
                    type="email"
                    class="form-control"
                    value
                    required
                    v-model="update.value.email"
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
                    v-model="update.value.organization"
                  >
                    <option
                      v-for="organization in organizations"
                      :value="organization.title"
                      :key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit(), $emit('close')">
                Save Client
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
import { reactive } from "vue";
import modifyDocument from "../composables/modifyDocument";
import getCollection from "../composables/getCollection";

export default {
  emits: ["close"],
  props: ["update_client"],
  setup(props) {
    const update = reactive({ ...props.update_client });

    const handleSubmit = async () => {
      const modified_client = {
        firstName: update.value.firstName,
        lastName: update.value.lastName,
        email: update.value.email,
        organization: update.value.organization,
      };

      modifyDocument("Clients", update.value.id).updateDoc(modified_client);
    };

    const { documents: organizations, error } = getCollection("Organizations");

    // loads the current organizations from firebase for the dropdown
    // menu when mounted
    //onMounted(loadOrganizations)

    return { update, organizations, error, handleSubmit };
  },
};
</script>

<style scoped src="../assets/styles/styles.css"></style>