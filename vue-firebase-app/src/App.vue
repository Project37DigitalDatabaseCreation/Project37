<!--
* App.vue
*
* Description: The main vue file which gets loaded
* on the application's page load.
*
-->
<template>
  <div>
    <navbar></navbar>
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import navbar from "./components/Navbar";

export default {
  components: {
    navbar
  }
};
</script>
