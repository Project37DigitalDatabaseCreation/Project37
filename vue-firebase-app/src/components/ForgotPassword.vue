<!--
* ForgotPassword.vue
*
* Author: Ben McElyea
* bmcelyea@gmail.com 
*
* Date: March 2021
*
* Description: Allows users to reset their password. 
*
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Forgot Password?</div>
          <div v-if="showMain" class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="row justify-content-center">
                <div class="col-8 text-center mb-4 mt-1">
                  <h5>Forgot your password?</h5>
                  <p>
                    Please enter your email address. We will send you an email
                    to reset your password.
                  </p>
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="email"
                  class="col-md-4 col-form-label text-md-right mb-2"
                  >Email:</label
                >
                <div class="col-md-5">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col text-center">
                  <button type="submit" class="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col text-center">
                  <router-link :to="{ name: 'Login' }"
                    >Back to Login</router-link
                  >
                </div>
              </div>
            </form>
          </div>
          <div v-if="showSuccess" class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="row justify-content-center">
                <div class="col-8 text-center mb-4 mt-1">
                  <h5>Email sent</h5>
                  <p>Check your email for a link to reset your password.</p>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col text-center">
                  <router-link :to="{ name: 'Login' }"
                    >Back to Login</router-link
                  >
                </div>
              </div>
            </form>
          </div>
          <div v-if="showError" class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="row justify-content-center">
                <div class="col-8 text-center mb-4 mt-1">
                  <h5>Error</h5>
                  <p>{{ errorMessage.message }}</p>
                </div>
              </div>
              <div class="form-group row">
                <div class="col text-center">
                  <button
                    class="btn btn-primary"
                    @click.prevent="returnClicked"
                  >
                    Return
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
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
      },
      error: null,
      showMain: true,
      showError: false,
      showSuccess: false,
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.form.email)
        .then(() => {
          this.showMain = false;
          this.showSuccess = true;
        })
        .catch((error) => {
          this.showMain = false;
          this.showSuccess = false;
          this.errorMessage = error;
          this.showError = true;
        });
    },
    returnClicked() {
      this.showError = false;
      this.showMain = true;
      this.showSuccess = false;
    },
  },
};
</script>


