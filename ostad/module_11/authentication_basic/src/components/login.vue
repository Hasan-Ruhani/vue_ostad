<script setup>
import {authStore} from '../store/store'

</script>

<template>

    <article class="mb-10">
        <h1 class="text-xl mb-2">Home Page</h1>
        <p>
            This is authenticate page
        </p>

        <p class="mt-5">
            <button @click="authStore.authenticate()" type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">    
                <span v-if="authStore.isAuthenticated">You're already logged in</span>
                <span v-else>Login</span>
            </button>

            <button @click="authStore.logout()" type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Logout
            </button>
        </p>
            
    </article>
    
</template>

<style scoped>

</style>