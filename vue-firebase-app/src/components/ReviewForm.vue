<template>
    <div style="position:fixed; left:200px; width:90%;">
    <div class="justify-content-center">
      <div class="col-md-12" style="padding:0 !important;">
        <div class="card">
          <div class="card-header">Quality Review Form</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-10">
                  <input id="st-1" type="checkbox" name="MET" />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-10">
                  <input id="st-2" type="checkbox" name="MET" />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
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
export default {
    data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      console.log('yee')
    }
  }
}
</script>
<style scoped>
.card {
    width: 700px;
}
/* TODO: Add in breakpoints for the width */
</style>