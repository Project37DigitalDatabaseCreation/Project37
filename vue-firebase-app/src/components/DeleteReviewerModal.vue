<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            {{passedMessageTitle}}
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group row">
                <label for="course_name" class="col-md-4 col-form-label text-md-right">{{passedMessage}}</label>

              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="handleSubmit()">Ok</button>
              <button class="btn btn-primary" @click="$emit('close')">Cancel</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    selected_review: Object,
    reviewers: Array,
    passedMessage: String,
    passedMessageTitle: String,
  },
  data() {
      return {
        showModal: false,
        review: this.selected_review
      }
  },
  methods: {
    handleSubmit() {
      this.$emit("edit-review", this.review);
      this.$emit('close');
    }
  }
};
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