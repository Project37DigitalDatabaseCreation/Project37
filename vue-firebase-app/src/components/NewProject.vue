<!--
* Project.vue
*
* Description: Overview for New Project Landing Page:
* allows the user to create a new project
*
-->

<template>
    <!-- Form to input new Project -->
    <div class="container">
    <div style="position:fixed; left:200px; width:90%;">
    <div class="justify-content-center">
      <div class="col-md-10" style="padding:0 !important;">
        <div class="card">
          <div class="card-header text-center">New Project</div>
            <div class="card-body">
                <div v-if="error" class="alert alert-danger">{{error}}</div>
                <!-- Input fields for form -->
                <form action="#" @submit.prevent="submit">
                    <!-- Title label and textbox -->
                    <div class="form-group row">
                        <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>
                          <div class="col-md-8">
                            <input id="title" type="text" class="form-control" name="title" value required v-model="form.title" />
                          </div>
                    </div>
                    <!-- Organization label and dropdown menu -->
                    <div class="form-check row">
                        <label for="organization" class="col-md-4 col-form-label text-md-right">Organization</label>
                          <select class="selectpicker" name="organizations" id="organizations" value required v-model="form.organization">
                            <option disabled value="">Choose Organization</option>
                            <option value="asu">Arizona State University</option>
                            <option value="gcu">Grand Canyon University</option>
                            <option value="mcc">Mesa Community College</option>
                            <option value="scc">Scottsdale Community College</option>
                          </select>
                    </div>
                    <!-- Clients label and dropdown menu -->
                    <div class="form-check row">
                        <label for="clients" class="col-md-4 col-form-label text-md-right">Clients</label>
                          <select name="client" id="client" value required v-model="form.client">
                            <option disabled value="">Choose client(s)</option>
                            <option value="asu">Client 1</option>
                            <option value="gcu">Client 2</option>
                            <option value="mcc">Client 3</option>
                            <option value="scc">Client 4</option>
                          </select>
                    </div>
                    <!-- Description label and textbox -->
                    <div class="form-group row">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                          <div class="col-md-8">
                            <input id="title" type="text" class="form-control" name="title" value required v-model="form.description" />
                          </div>
                    </div>
                    <!-- Submit new project -->
                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-4">
                          <button type="submit" class="btn btn-primary">Create New Project</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          form: {
            title: "",
            organization: "",
            description: "",
            client: ""
          },
        error: null
        };
      },

      //implement submit/firebase logic 
    }
</script>