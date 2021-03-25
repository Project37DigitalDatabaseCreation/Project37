<template>
    <div v-if="!loading"
        style="display:flex; flex-direction:column; justify-content:center; align-items:center; margin-top:150px;">
        <div style="font-size:24px; font-weight:bold;">Invitation Pending</div>
        <div style="font-size:18px;">An invitation for your registration has been created,
            please contact your admin to accept it.</div>
    </div>
    <div v-else
        style="display:flex; justify-content:center; align-items:center; width:100%;">
        <div class="loader"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    mounted() {
        //  Route the user accordingly
        this.routeUser()
    },
    methods: {
        routeUser() {
            if (this.user.isAdmin === true) {
                this.$router.replace({ name: 'AdminDashboard' })
            } else if (this.user.isReviewer === true) {
                this.$router.replace({ name: 'ReviewerDashboard' })
            } else if (this.user.isClient === true) {
                this.$router.replace({ name: 'ClientDashboard' })
            }
        }
    },
    watch: {
        user() {
            this.routeUser()
        }
    }
}
</script>