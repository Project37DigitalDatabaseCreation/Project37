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
            <router-link to="/" class="navbar-brand">eLM Academic Consultants
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto"></ul>
                <ul class="navbar-nav ml-auto">
                    <template v-if="user.loggedIn">
                        <ul
                            style="list-style:none; display:flex; justify-content:space-between;">
                            <template v-for="(item,i) in navLinks" :key="i">
                                <li class="nav-item">
                                    <router-link v-if="item.link && !item.hidden"
                                        :to="item.link" class="nav-link">
                                        {{ item.name }}
                                    </router-link>
                                    <div v-else-if="item.display" class="nav-item">
                                        {{ user.data.displayName }}
                                    </div>
                                    <a v-else-if="item.method" class="nav-link"
                                        @click.prevent="signOut">Sign Out</a>
                                </li>
                            </template>
                        </ul>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link to="login" class="nav-link">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="register" class="nav-link">Register
                            </router-link>
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
    mounted() {
        console.log('USER DOC', this.userDocument)
    },
    computed: {
        ...mapGetters({
            // map `this.user` to `this.$store.getters.user`
            user: 'user',
            userDocument: 'userDocument'
        }),
        navLinks() {
            const links = [
                {
                    link: '/manage-clients',
                    name: 'Manage Client',
                    hidden: !this.userDocument
                },
                {
                    link: '/project-reviews',
                    name: 'Project Reviews',
                    hidden: !this.userDocument
                },
                {
                    link: '/addreviewer',
                    name: 'Add Reviewer',
                    hidden: !this.userDocument
                },
                {
                    link: '/modifyreviewer',
                    name: 'Modify Reviewers',
                    hidden: !this.userDocument
                },
                {
                    link: '/managereviewers',
                    name: 'Manage Reviewers',
                    hidden: !this.userDocument
                },
                {
                    link: '/reviews',
                    name: 'Reviews',
                    hidden: !this.userDocument
                },
                {
                    link: '/currentprojects',
                    name: 'Current Projects',
                    hidden: !this.userDocument
                },
                {
                    display: true
                },
                {
                    method: 'signOut'
                }
            ]

            return links
        }
    },
    methods: {
        signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ path: 'login' })
                })
        }
    }
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
