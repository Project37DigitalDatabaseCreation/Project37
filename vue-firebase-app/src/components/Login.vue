<!--
* Login.vue
*
* Description: Provides username and password
* fields for users to login to the firebase
* application.
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card" style="margin-right:15px;">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >
                <div class="col-md-6">
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
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >
                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col text-center">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
              <div class="form-group row">
                <div class="col text-center">
                  <router-link :to="{ name: 'ForgotPassword' }"
                    >Forgot Password?</router-link
                  >
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
        password: "",
      },
      error: null,
    };
  },

  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((userCredential) => {
          this.$store
            .dispatch("fetchUser", userCredential.user)
            .then((storeUser) => {
              if (storeUser && storeUser.isAdmin === true) {
                this.$router.replace({ name: "AdminDashboard" });
              } else if (storeUser && storeUser.isClient === true) {
                this.$router.replace({ name: "ClientDashboard" });
              } else if (storeUser && storeUser.isReviewer === true) {
                this.$router.replace({ name: "ReviewerDashboard" });
              } else {
                this.$router.replace({ name: "Pending" });
              }
            });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>


