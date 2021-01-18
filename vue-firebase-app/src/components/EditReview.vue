<!--
* Review.vue
*
* Description: Provides the necessary fields to allow a user
* to create and edit a Quality Matters review
*
-->
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Review Setup</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="course_name" class="col-md-4 col-form-label text-md-right">Course Name</label>

                <div class="col-md-6">
                  <input
                    id="course_name"
                    type="text"
                    class="form-control"
                    name="course_name"
                    value
                    required
                    autofocus
                    v-model="form.course_name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="project" class="col-md-4 col-form-label text-md-right">Project</label>

                <div class="col-md-6">
                  <select
                    id="project"
                    class="form-control"
                    name="project"
                    required
                    v-model="form.project"
                  >
                    <option v-for="project in projects" :value="project.id" :key="project.id">{{ project.name }}</option>                
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="reviewer" class="col-md-4 col-form-label text-md-right">Reviewer</label>

                <div class="col-md-6">
                  <input
                    id="reviewer"
                    type="text"
                    class="form-control"
                    name="reviewer"
                    required
                    v-model="form.reviewer"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Save</button>
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
        project: 2,
        reviewer: "myReviewer"
      },
      projects: [
        {name: "Option 1", id: 1},
        {name: "Option 2", id: 2},
        {name: "Option 3", id: 3}
      ],
      error: null
    };
  },
  mounted() {
    /*var selProject = document.querySelector('#project');
    var option = document.createElement('option');

    option.value = "val1";
    option.text = "Option 1";

    selProject.appendChild(option);*/
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>