<!--
* ClientEntry.vue
*
* Description: Provides the necessary fields to allow an admin user
* to create and edit a client for each organization
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Clients:</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label
                  for="first_name"
                  class="col-md-4 col-form-label text-md-right"
                  >First Name</label
                >

                <div class="col-md-6">
                  <input
                    id="first_name"
                    type="text"
                    class="form-control"
                    name="first_name"
                    value
                    required
                    autofocus
                    v-model="form.first_name"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="last_name"
                  class="col-md-4 col-form-label text-md-right"
                  >Last Name</label
                >

                <div class="col-md-6">
                  <input
                    id="last_name"
                    type="text"
                    class="form-control"
                    name="last_name"
                    value
                    required
                    autofocus
                    v-model="form.last_name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="email"
                    required
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="organization"
                  class="col-md-4 col-form-label text-md-right"
                  >Organization</label
                >

                <div class="col-md-6">
                  <input
                    id="organization"
                    type="text"
                    class="form-control"
                    name="organization"
                    required
                    v-model="form.organization"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Save</button>
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
  import firebase from 'firebase'
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        error: null,
      }
    },
    methods: {
      submit() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            this.$router.replace({ name: 'Dashboard' })
          })
          .catch((err) => {
            this.error = err.message
          })
      },
    },
  }
</script>
