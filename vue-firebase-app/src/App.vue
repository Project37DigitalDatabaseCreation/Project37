<!--
* App.vue
*
* Description: The main vue file which gets loaded
* on the application's page load.
*
-->
<template>
    <div id="content">
        <perfect-scrollbar>
        <navbar></navbar>
        <main>
            <router-view></router-view>
        </main>
        </perfect-scrollbar>
    </div>
</template>

<script>
import navbar from './components/Navbar'
import './assets/styles/styles.css'

export default {
    components: {
        navbar
    }
}
</script>
<style>
html,
body {
    overflow: auto;
    min-height: 100%;
}
body {
    height: 100vh;
}
#app {
    overflow: auto;
    height: 100vh;
}

.ps {
  height: 200px;
}

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
