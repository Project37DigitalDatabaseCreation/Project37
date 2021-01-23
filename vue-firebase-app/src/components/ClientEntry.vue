<!--
* ClientEntry.vue
*
* Description: Provides the necessary fields to allow an admin user
* to create and edit a client for each organization
*
the following fields: First Name, Last Name, Email, and Organization

Organization is a drop down: relies on project being created.
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Add Clients:
          </div>
          <div class="card-body">
            <form @submit.prevent="">
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >

                <div class="col-md-6">
                  <input type="text" required placeholder="First Name" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >

                <div class="col-md-6">
                  <input type="text" required placeholder="Last Name" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input type="email" required placeholder="Email" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >

                <div class="col-md-6">
                  <select required>
                    <option
                      v-for="organization in organizations"
                      v-bind:key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button class="btn btn-primary">
                    Add Client
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getOrganizations from '../composables/getOrganizations'

  export default {
    setup() {
      const { organizations, error, load } = getOrganizations()

      load()

      return { organizations, error }
    },
  }
</script>
