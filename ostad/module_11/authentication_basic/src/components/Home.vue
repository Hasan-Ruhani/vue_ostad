<script setup>
import {authStore} from '../store/store'

</script>

<template>

    <article class="mb-10">
        <h1 class="text-xl mb-2">Home Page</h1>
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit maiores tempora expedita minus aliquam maxime consequatur necessitatibus distinctio deserunt molestiae.
        </p>

        <p class="mt-5" v-if="authStore.isAuthenticated">This is some secret content</p>
    </article>
    
</template>

<style scoped>

</style>