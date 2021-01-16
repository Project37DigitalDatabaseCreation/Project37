<!--
* AddReviewer.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to add new reviewers to the system. 
* Contains the fields First Name, Last Name and email and a checkbox
* that designates if the user is an administrator
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add a new reviewer</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="First Name" class="col-md-4 col-form-label text-md-right">First Name</label>

                <div class="col-md-6">
                  <input
                    id="fname"
                    type="text"
                    class="form-control"
                    name="fname"
                    value
                    required
                    autofocus
                    v-model="form.fname"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="Last Name" class="col-md-4 col-form-label text-md-right">Last Name</label>

                <div class="col-md-6">
                  <input
                    id="lname"
                    type="text"
                    class="form-control"
                    name="lname"
                    value
                    required
                    autofocus
                    v-model="form.lname"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

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
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

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
                <label for="password" class="col-md-4 col-form-label text-md-right">Administror Access</label>
                <div class="col-md-6">
                  <input type="radio" name="isAdmin" id="yes" value="true" v-model="form.isAdmin">
                   <label for="Administrator Access">Yes</label>
                  <br>
                  <input type="radio" name="isAdmin"  value="false" v-model="form.isAdmin">
                  <label for="No access">No</label>
                  <br>

                </div>
              </div>
              

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Create reviewer</button>
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
//import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        isAdmin: false
      },
  
      error: null
    };
  },
  methods: {
    submit() {

      let newUser = {
        firstName: this.form.fname,
        lastName: this.form.lname,
        email: this.form.email,
        password: this.form.password,
        isAdmin: this.form.isAdmin
      }

    console.log(newUser)
    
    //this.$emit('reviewer-created', newUser)
    
    /** TODO create firebase method
     firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
       */

        this.form.name = "",
        this.form.email =  "",
        this.form.password = "",
        this.form.isAdmin = false
    }
  }
};
</script>
<style scoped>

/* TODO: Add in breakpoints for the width */
</style>