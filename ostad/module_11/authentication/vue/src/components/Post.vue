<script setup>
import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { ref, reactive, onBeforeMount } from 'vue';

  const post = reactive({});
  const route = useRoute();
  const id = route.params.id;
  const comments = ref([]);

  onBeforeMount(()=>{
    fetch(`https://fakestoreapi.com/products/${id}`)                // use fetch call
    .then(res => res.json())
    .then(data => {
      post.id = data.id;
      post.title = data.title;
      post.description = data.description;
      post.image = data.image;
    });
    

    // axios.get(`https://fakestoreapi.com/products/${id}`)         // use axios call
    // .then(res => {
    //   post.id = res.data.id;
    //   post.title = res.data.title;
    //   post.description = res.data.description;
    //   post.image = res.data.image;
    // })

    axios.get(`https://jsonplaceholder.typicode.com/post/${id}/comments`)
    .then(res => {
      comments.value = res.data;
    });
  });

</script>

<template>

  <h1 class="text-xl mb-2">This is Post Page</h1>
  <article class="text-left mb-10">

    <h1 class="text-xl mb-2">
      {{ post.title }}
    </h1>

    <p>
      <img :src="post.image" alt="" :style="{ width: '300px', height: '200px' }">
      {{ post.description }}
    </p>
  </article>
    <h2 class="font-bold" v-if="comments.length > 0">Comments</h2>
    <hr/>
    <ul>
      <li class="mt-3" v-for="comment in comments" :key="comment.id">
        <p><strong>{{ comment.name }}</strong> sayd {{ comment.body }}</p> 
      </li>
    </ul>
  <article>

  </article>
</template>

<style scoped>

</style>
