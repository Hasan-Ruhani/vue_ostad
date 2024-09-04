
<script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    }
  })
  </script>

<template>
    <div v-if="show" class="overlay">
      <div class="flex items-center justify-center min-h-screen">
        <p class="text-white text-center">Please wait a moment...</p>
      </div>
    </div>
</template>
  
<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7); /* Dark semi-transparent background */
    backdrop-filter: blur(1px); /* Apply the blur effect */
    z-index: 9999; /* Ensure it covers everything */
    animation: hackerBlur 4s ease-in-out; /* Add an animation */
  }
  
  @keyframes hackerBlur {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>


  