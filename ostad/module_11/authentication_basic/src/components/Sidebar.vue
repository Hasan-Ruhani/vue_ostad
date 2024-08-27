<script setup>

</script>

<template>

<section class="mt-[40px] text-white p-5">
    <ul class="flex flex-col space-y-5">
    <li>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <RouterLink :to="{name: 'home'}">Home</RouterLink>
    </li>
    <li>
        <!-- <RouterLink to="/about">About</RouterLink> -->
        <RouterLink :to="{name: 'about'}">About</RouterLink>
    </li>
    <li>
        <RouterLink to="/contact">Contact</RouterLink>
    </li>
    <li>
        <RouterLink to="/blogs">Blogs</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: 'protected'}">Protected</RouterLink>
    </li>
    <li>
        <RouterLink :to="{name: 'login'}">Login</RouterLink>
    </li>
    </ul>
</section>
    
</template>

<style scoped>

</style>