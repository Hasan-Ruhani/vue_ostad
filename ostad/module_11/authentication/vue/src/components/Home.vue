<script setup>
 import { authStore } from "../store/store";

</script>

<template>

    <article class="mb-10">
        <h1 class="text-xl mb-2">Home Page</h1>
        <p>
        <img src="https://source.unsplash.com/random/300x200?2" alt="">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, esse id. Dolorum delectus quas eos dolores amet cupiditate sed fugiat, facere quisquam deserunt suscipit culpa animi neque, modi inventore officiis omnis nam.
        </p>

        <h1 v-if="!authStore.isAuthenticated" class="text-2xl mt-5">Here are some secreate content. Its only show when you loggedin...!</h1>
        <div v-if="authStore.isAuthenticated" class="mt-5">
          <h2 class="text-2xl mt-2">showing secreate content...</h2>
          <p class="mt-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure minima, incidunt ipsum nesciunt ut numquam nam? Dolor minima repellendus officia.</p>
        </div>

  </article>
  
</template>

<style scoped>

</style>