<template>
    <div>
      <ReviewNav></ReviewNav>
      <ReviewForm></ReviewForm>
    </div>
</template>
<script>
import ReviewForm from "./ReviewForm";
import ReviewNav from "./ReviewNav";
export default {
  components: {
    ReviewForm,ReviewNav
  }
};
</script>