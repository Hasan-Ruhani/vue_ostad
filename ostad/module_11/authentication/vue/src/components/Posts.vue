<script setup>
  import axios from 'axios';
  import { ref, reactive, onBeforeMount } from "vue";
  const posts = ref([]);
  onBeforeMount(()=>{
    // fetch('https://fakestoreapi.com/products')          // use fetch call
    // .then(res=>res.json())
    // .then(data=>{
    //   posts.value = data;
    // })

    axios.get('https://fakestoreapi.com/products')         // use axios call
    .then(res => {
      posts.value = res.data;
    });
  });

</script>

<template>
  <h1 class="text-xl mb-2">This is Posts Page</h1>
  <article class="text-left mb-10" v-for="post in posts" :key="post.id">

        <h1 class="text-xl mb-2">
          <router-link :to="{name: 'post', params: {id: post.id}}">{{ post.title }}</router-link>
        </h1>

        <p>
        <img :src="post.image" alt="" :style="{ width: '300px', height: '200px' }">
          {{ post.description }}
        </p>
  </article>

</template>

<style scoped>

</style>
