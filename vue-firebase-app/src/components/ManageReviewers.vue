<!--
* AddReviewer.vue
*
* Author: Ben McElyea
* Date: January 2021
*
* Description: Component to manage reviewers in the system. 
* This is the main landing page to manage reviewers
*
*
* This component is the parent of the ReviewerList.vue component. 
*
-->

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style scoped>
h4 {
  text-align: center;
}
th {
  padding-top: 12px;
  text-align: center;
  padding-bottom: 12px;
  background-color: #f2f2f2;
  color: black;
}
tr:hover {
  background-color: #ddd;
}

td {
  text-align: center;
  padding: 10px;
}

table {
  padding: 12px;
  width: 100%;
  border: 1px solid #ddd;
}

button {
  margin: 0 auto;
}
.paginationContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>