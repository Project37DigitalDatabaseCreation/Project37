<!--
* Navbar.vue
*
* Description: Implements a navigation bar
* for the application.
*
-->
<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div
      class="container"
      style="width: 400px; text-align: center; justify-content: center"
    >
      <router-link to="/" class="navbar-brand">
        <img
          width="428.25"
          height="168.5"
          id="logo"
          src="../assets/logos/eLMACADEMICTransparent.png"
        />
      </router-link>
      <button
        id="navButton"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="padding: 15px 100px; margin-right: 140px"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <template v-if="user.loggedIn">
            <template v-for="(item, i) in navLinks" :key="i">
              <li
                class="nav-item"
                style="
                  list-style: none;
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 5px;
                  text-align: center;
                  width: auto;
                "
                @click.prevent="closeMenu"
              >
                <router-link
                  v-if="item.link && !item.hidden"
                  :to="item.link"
                  class="nav-link"
                  style="color: #1c4d0b;"
                >
                  {{ item.name }}
                </router-link>
                <div
                  v-else-if="item.display && user.loggedIn"
                  class="nav-link disabled"
                >
                  {{ user.displayName }}
                </div>
                <a
                  v-else-if="item.method"
                  class="nav-link"
                  style="color: #1c4d0b;"
                  @click.prevent="signOut"
                  >Sign Out</a
                >
              </li>
            </template>
          </template>
          <template v-else>
            <li
              class="nav-item"
              @click.prevent="closeMenu"
              style="
                list-style: none;
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                text-align: center;
              "
            >
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li
              class="nav-item"
              @click.prevent="closeMenu"
              style="
                list-style: none;
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                text-align: center;
              "
            >
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  mounted() {
    console.log("USER", this.user);
    var scripts = [
      "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
      "//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js",
    ];
    scripts.forEach((script) => {
      let tag = document.createElement("script");
      tag.setAttribute("src", script);
      document.head.appendChild(tag);
    });
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
    navLinks() {
      const links = [
        {
          link: "/currentprojects",
          name: "Projects",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/reviews",
          name: "Reviews",
          hidden: !this.user.isReviewer,
        },
        {
          link: "/project-reviews",
          name: "Project Reviews",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/manage-clients",
          name: "Clients",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/organizations",
          name: "Organizations",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/managereviewers",
          name: "Reviewers",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/general-standards",
          name: "General Standards",
          hidden: !this.user.isAdmin,
        },
        {
          link: "/standards",
          name: "Standards",
          hidden: !this.user.isAdmin,
        },
        {
          display: true,
        },
        {
          method: "signOut",
        },
      ];

      return links;
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("SET_USER", {
            displayName: "",
            email: "",
            isClient: false,
            isReviewer: false,
            isAdmin: false,
            loggedIn: false,
          });
          console.log("userasdf", this.user);
          this.$router.push({ path: "login" });
        });
    },
    closeMenu() {
      if (
        !document.getElementById("navButton").classList.contains("collapsed")
      ) {
        document.getElementById("navButton").click();
      }
    },
  },
};
</script>

<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

<style>
.nav {
    width: auto;
}

.navbar {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    font-size: 1.5em;
}
.navbar-toggle .icon-bar{
    width: 100px !important;
    height:30px !important;
}
.navbar-collapse.collapse.in {
    display: inline-block; 
}
</style>
