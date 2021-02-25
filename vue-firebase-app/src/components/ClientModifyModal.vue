<!--
* ClientEntry.vue
*
* Description: Provides the necessary fields to allow an admin user
* to create and edit a client for each organization
*
* the following fields: First Name, Last Name, Email, and Organization
*
* Organization is a drop down: relies on project being created.
-->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Edit Client
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form @submit.prevent="handleSubmit">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >First Name</label
                  >
                  <div class="col-md-6">
                    <input
                      type="text"
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
                    <input type="email" required v-model="update.value.email" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >Organization</label
                  >

                  <div class="col-md-6">
                    <select required v-model="update.value.organization">
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
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="btn btn-primary"
                @click="handleSubmit(), $emit('close')"
              >
                Save Client
              </button>
              <button class="btn btn-primary" @click="$emit('close')">
                Cancel
              </button>
            </slot>
            <p>{{ update.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { onMounted, reactive } from 'vue'
  import getOrganizations from '../composables/getOrganizations'
  import modifyDocument from '../composables/modifyDocument'

  export default {
    props: ['userName', 'age', 'update_client'],
    setup(props) {
      const update = reactive({ ...props.update_client })

      const handleSubmit = async () => {
        const modified_client = {
          firstName: update.value.firstName,
          lastName: update.value.lastName,
          email: update.value.email,
          organization: update.value.organization,
        }

        modifyDocument('Clients', update.value.id).updateDoc(modified_client)
      }

      const { organizations, error, loadOrganizations } = getOrganizations()

      // loads the current organizations from firebase for the dropdown menu
      // when mounted
      onMounted(loadOrganizations)

      return { update, organizations, error, handleSubmit }
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
</style>
