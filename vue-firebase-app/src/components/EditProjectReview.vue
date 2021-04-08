<!--
* EditProjectReview.vue
*
* Description: Provides form to edit or create a project review.
* The form is used as a modal pop out and interacts with the
* ProjectReviews component.
*
-->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot v-if="review.id" name="header">              
              Update Review Status
            </slot>
            <slot v-else name="header">              
              Add New Review to Project
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
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
                    v-model="review.course_name"
                    />
                </div>
              </div>

              <div class="form-group row">
                <label for="reviewer" class="col-md-4 col-form-label text-md-right">Reviewer</label>

                <div class="col-md-6">
                    <select
                    id="reviewer"
                    class="form-control"
                    name="reviewer"
                    required
                    v-model="review.reviewer.id"
                    >
                    <option v-for="reviewer in reviewers" :value="reviewer.id" :key="reviewer.id">
                        {{ reviewer.data().lastName + ", " + reviewer.data().firstName}}
                    </option>                
                    </select>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn save" @click="handleSubmit()">Save</button>
              <button class="btn cancel" @click="$emit('close')">Cancel</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "EditProjectReview",
  props: {
    selected_review: Object,
    reviewers: Array
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

<style scoped src="../assets/styles/styles.css"></style>