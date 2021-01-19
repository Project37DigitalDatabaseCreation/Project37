<!--
* AddReviewer.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to modify existing reviewers. 
* Contains the fields First Name, Last Name and email address and a checkbox
* that designates if the user is an administrator
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Modify reviewer</div>
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
                <label for="password" class="col-md-4 col-form-label text-md-right">Administror Access</label>
                <div class="col-md-6">
                  <input class="radioButton" type="radio" name="isAdmin" id="yes" value="true" v-model="form.isAdmin">
                   <label for="Administrator Access">Yes</label>
                  <br>
                  <input class="radioButton" type="radio" name="isAdmin"  value="false" v-model="form.isAdmin">
                  <label for="No access">No</label>
                  <br>

                </div>
              </div>
              

              <div class="form-group row">
                <div class="col-md-8 offset-md-4">
                <button type="button" class="btn btn-primary"  @click.prevent="cancelClicked">Cancel</button>
                <button type="submit" class="btn btn-primary">Update reviewer</button>
                <button type="submit" class="btn btn-primary">Reset password</button>
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
        isAdmin: false
      },
  
      error: null
    };
  },
  methods: {
    submit() {

      let modifiedUser = {
        firstName: this.form.fname,
        lastName: this.form.lname,
        email: this.form.email,
        isAdmin: this.form.isAdmin
      }

    console.log(modifiedUser)
    
    //this.$emit('reviewer-created', newUser)
    
    //TODO create firebase method to modify data
        this.form.name = "",
        this.form.email =  "",
        this.form.isAdmin = false
    },


    cancelClicked() {

      console.log("Cancel Clicked")
      
      //TODO handle cancel event
      this.$router.back()

  }

  },

};
</script>
<style scoped>
    .radioButton, button {
        margin-right: 10px;
    }
/* TODO: Add in breakpoints for the width */
</style>