<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Edit Project
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label for="project_name" class="col-md-4 col-form-label text-md-right">Project</label>

                <div class="col-md-6">
                    <input
                    id="project_name"
                    type="text"
                    class="form-control"
                    name="project_name"
                    value
                    required
                    autofocus
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="client_names" class="col-md-4 col-form-label text-md-right">Clients</label>

                <div class="col-md-6">
                    <select
                    id="client_names"
                    type="text"
                    class="form-control"
                    name="client_names"
                    value
                    required
                    autofocus
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="num_reviews" class="col-md-4 col-form-label text-md-right">Reviews</label>

                <div class="col-md-6">
                    <select
                    id="num_reviews"
                    type="text"
                    class="form-control"
                    name="num_reviews"
                    value
                    required
                    autofocus
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="status" class="col-md-4 col-form-label text-md-right">Status</label>

                <div class="col-md-6">
                    <select
                    id="status"
                    type="text"
                    class="form-control"
                    name="status"
                    value
                    required
                    autofocus
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="organization_name" class="col-md-4 col-form-label text-md-right">Organization</label>

                <div class="col-md-6">
                    <select
                    id="organization_name"
                    type="text"
                    class="form-control"
                    name="organization_name"
                    value
                    required
                    autofocus
                    />
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="$emit('close')">Save</button>
              <button class="btn btn-primary" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
 
<script>
  export default {
    name: "EditProject",
    data() {
        return {
          projects: [],
          title: this.project
        };
      },
  }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>