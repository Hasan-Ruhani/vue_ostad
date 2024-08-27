<script setup>
    
    import {ref} from 'vue';

    const props = defineProps({
        start:{
            type: Number,
            default: 0
        }
    });

    const count = ref(props.start);

    function increase() {
        count.value++;
    }

    function decrease() {
        count.value--;
    }

</script>

<template>

  <button @click="decrease()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    -
  </button>

  <span class="px-5"> {{ count }} </span>

  <button @click="increase()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    +
  </button>

</template>

<style scoped>

</style>