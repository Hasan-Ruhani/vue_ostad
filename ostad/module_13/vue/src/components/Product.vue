<script setup>
import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { cart } from '../store/cart';
  import { ref, reactive, onBeforeMount } from 'vue';

  const product = reactive({});
  const route = useRoute();
  const id = route.params.id;
  const comments = ref([]);

  onBeforeMount(()=>{
    axios.get(`http://localhost:8000/api/products/${id}`)         // use axios call
    .then(res => {
      product.id = res.data.id;
      product.title = res.data.title;
      product.image = res.data.image;
      product.price = res.data.price;
      product.description = res.data.description;
    })
  });

</script>

<template>
  <h1 class="text-xl mb-2">This is Product Details</h1>
  <article class="text-left mb-10">

    <h1 class="text-xl mb-2">
      {{ product.title }}
    </h1>

    <p>
      <img class="w-60" :src="product.image" alt="">
      {{ product.description }}
    </p>
    
    <p>${{ product.price }}</p>
    
    <button @click="cart.addItem(product)" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add to Cart
    </button>
  </article>
</template>

<style scoped>

</style>
