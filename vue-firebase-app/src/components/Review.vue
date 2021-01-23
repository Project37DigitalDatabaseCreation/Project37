<template>
    <div style="display:flex;" :style="`height:${contentHeight}px`">
      <ReviewNav @go-to-item="goToItem"></ReviewNav>
      <ReviewForm :currentLink="currentLink"></ReviewForm>
    </div>
</template>
<script>
import ReviewForm from "./ReviewForm";
import ReviewNav from "./ReviewNav";
import { ref } from 'vue'
export default {
  setup() {
    const currentLink = ref(1)
    return { currentLink }
  },
  components: {
    ReviewForm,ReviewNav
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    generalStandards() {
      return this.$store.getters.generalStandards
    },
    sortedStandards() {
      return this.$store.getters.sortedStandards
    },
    standards() {
      return this.$store.getters.standards
    }
  },
  methods: {
    goToItem(item) {
      this.currentLink = item.genStandard.number
    }
  }
};
</script>