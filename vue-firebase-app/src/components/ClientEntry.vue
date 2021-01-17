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
            <form>
              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >

                <div class="col-md-6">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    v-model="firstName"
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
                    v-model="lastName"
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
                    required
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >

                <div class="col-md-6">
                  <select v-model="selected">
                    <option v-for="option in options" v-bind:key="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">
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
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Select an Organization' },
          { value: 'a', text: 'ASU' },
          { value: 'b', text: 'Project37' },
        ],
      }
    },
  }
</script>
