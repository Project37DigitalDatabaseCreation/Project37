<!--
* Project.vue
*
* Description: Overview for Project Landing Page
* allows the user to create a new project or 
* review existing projects.
*
-->

<template>
    <!-- Navbar for project options -->
    <div class="topnav navbar-light" >
        <li>
            <router-link to="NewProject" class="nav-link">New Project</router-link>
        </li>
        <li>
            <router-link to="CurrentProjects" class="nav-link">Current Projects</router-link>
        </li>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

</style>