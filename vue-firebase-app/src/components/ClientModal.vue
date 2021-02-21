<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Add Client
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form @submit.prevent="handleSubmit">
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >First Name</label
                  >
                  <div class="col-md-6">
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      v-model="firstName"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >Last Name</label
                  >
                  <div class="col-md-6">
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      v-model="lastName"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >Email</label
                  >
                  <div class="col-md-6">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      v-model="email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right"
                    >Organization</label
                  >

                  <div class="col-md-6">
                    <select required v-model="organization">
                      <option
                        v-for="organization in organizations"
                        v-bind:key="organization.title"
                      >
                        {{ organization.title }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button class="btn btn-primary" type="submit">
                      Add Client
                    </button>
                  </div>
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="handleSubmit()">
                Add Client
              </button>
              <button class="btn btn-primary" @click="$emit('close')">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'EditProjectReview',
    props: {
      selected_review: Object,
      reviewers: Array,
    },
    data() {
      return {
        showModal: false,
        review: this.selected_review,
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('edit-review', this.review)
        this.$emit('close')
      },
    },
  }
</script>
