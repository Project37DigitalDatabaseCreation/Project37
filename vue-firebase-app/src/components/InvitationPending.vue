<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Invitation pending</div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-8 text-center mb-4 mt-1">
                <p>
                  An invitation for your registration has been created. You
                  should receive an email when your account is approved.
                </p>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col text-center">
                <router-link :to="{ name: 'Login' }">Back to Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped src="../assets/styles/styles.css"></style>