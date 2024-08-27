<script setup>
  import axios from 'axios';
  import { authStore } from '../store/store';
  import { cart } from '../store/cart';
  import  { wishlist }  from '../store/wishlist';
  import WishListIcon from './WishListIcon.vue'
  import { ref, reactive, onBeforeMount } from "vue";
  const products = ref([]);
  onBeforeMount(()=>{
    axios.get('http://localhost:8000/api/products')         // use axios call
    .then(res => {
      products.value = res.data;
    });

    wishlist.fetchWishList();
  });

</script>

<template>
  <div class="bg-neutral-900">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-300">Products page</h2>
      <p>
        {{ wishlist.items }}
      </p>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img :src="product.image" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-200">
                <router-link :to="{name: 'product', params: { id: product.id }}">
                  {{ product.title }}
                </router-link>
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-200">${{ product.price }}</p>
          </div>
          <div class="flex justify-between items-center">
            <button @click="cart.addItem(product)" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Add to Cart
            </button>
            <!-- <img @click="wishlist.toggleWishList(product)" class="w-8 cursor-center" :src="wishlist.getIcon(product)" alt=""> -->
             <WishListIcon v-if="authStore.isAuthenticated" :product="product"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
<style scoped>

</style>
