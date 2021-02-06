<!--
* Navbar.vue
*
* Description: Implements a navigation bar
* for the application.
*
-->
<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand"
        >eLM Academic Consultants</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <ul
              style="list-style:none; display:flex; justify-content:space-between;"
            >
              <li class="nav-item">
                <router-link to="/manage-clients" class="nav-link"
                  >Manage Client</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/addreviewer" class="nav-link"
                  >Add Reviewer</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/modifyreviewer" class="nav-link"
                  >Modify Reviewer</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/managereviewers" class="nav-link"
                  >Manage Reviewer</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/reviews" class="nav-link"
                  >Reviews</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/newProject" class="nav-link"
                  >New Project</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/currentProjects" class="nav-link"
                  >Current Projects</router-link
                >
              </li>
              <div class="nav-item">{{ user.data.displayName }}</div>

              <li class="nav-item">
                <a class="nav-link" @click.prevent="signOut">Sign out</a>
              </li>
            </ul>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  export default {
    computed: {
      ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
        user: 'user',
      }),
    },
    methods: {
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push({ path: 'login' })
          })
      },
    },
  }
</script>
<style>
  .navbar {
    height: 56px !important;
  }
  .nav-item {
    margin-left: 6px;
    margin-right: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
