<!--
* App.vue
*
* Description: The main vue file which gets loaded
* on the application's page load.
*
-->
<template>
  <div id="content">
    <navbar></navbar>
    <main>
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
<style>
html, body {
  overflow: auto;
  min-height:100%;
}
body {
  height:100vh;
}
#app {
  overflow:hidden;
  height:100vh;

}
</style>
