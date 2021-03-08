<!--
* Register.vue
*
* Description: Provides name, username, and password
* fields for a new user to register with the application.
*
-->
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-group row">
                                <label for="name"
                                    class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="name" class="form-control"
                                        name="name" value required autofocus
                                        v-model="form.name" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="organization"
                                    class="col-md-4 col-form-label text-md-right">Organization</label>
                                <div class="col-md-6">
                                    <select name="organization" required
                                        v-model="form.organization"
                                        style="width:inherit; height:40px; border-radius:4px; border-color:rgb(206, 212, 218);">
                                        <option v-for="organization in organizations"
                                            :value="organization"
                                            :key="organization.title">
                                            {{ organization.title }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email"
                                    class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control"
                                        name="email" value required autofocus
                                        v-model="form.email" />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password"
                                    class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password"
                                        class="form-control" name="password" required
                                        v-model="form.password" />
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit"
                                        class="btn btn-primary">Register</button>
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
                name: '',
                email: '',
                organization: null,
                password: ''
            },
            error: null
        }
    },
    mounted() {
        this.$store.dispatch('fetchOrganizations')
    },
    computed: {
        organizations() {
            return this.$store.getters.organizations
        }
    },
    methods: {
        submit() {
            //  This creates a user in Firebase Auth
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then((data) => {
                    //  Create an Invitation
                    firebase.firestore().collection('Invitations').add({
                        name: this.form.name,
                        email: this.form.email,
                        uid: data.user.uid,
                        //  This stores a map of the id and name
                        //  This is ok because Invitations are temporary documents
                        organization: this.form.organization
                    })

                    //  Also update the user's profile
                    data.user
                        .updateProfile({
                            displayName: this.form.name
                        })
                        .then(() => {})

                    //  This user doesn't have any permissions so we have to route them to a default page
                    this.$router.replace({ name: 'InvitationPending' })
                })
                .catch((err) => {
                    this.error = err.message
                })
        }
    }
}
</script>
