<script setup>
    import {ref, reactive, onBeforeMount, watch, computed} from 'vue';
    import {useRoute} from 'vue-router';    // its import for tag dynamic
    import axios from 'axios';
    const posts = ref([]);   
    const route = useRoute();

    // function getSlug(title){
    //     return title.toLowerCase().replace(/\s+/g, '_');   // if you use slug
    // }
    const tag = ref();                                   // this method use only for when you return dynamic value to frontend and run any others api together
    watch(() => route.params.tag, (newValue) => {
        tag.value = newValue;
    });
    //...................2nd method
    // const tag = computed(() => {            // this method use only for return dynamci value to frontend
    //     return route.params.tag;
    // });

    //...................................................if you use axios call for get api dummy data   
    // axios.get('https://dummyjson.com/posts/')
    // .then(res => {
    //     posts.value = res.data.posts
    // });

    //.............................if you use fetch call for get api dummy data                     
    onBeforeMount(() => {                 // call an API for viewing dummy data
        fetch('https://dummyjson.com/posts/')
        .then(res => res.json())
        .then(data => {
            posts.value = data.posts;
        });
    });

</script>

<template>

    <div class="my-5">
        {{ tag }}
    </div>

    <article v-for="post in posts" :key="post.id" class="mb-10">
        <h1 class="text-xl mb-2">
            <router-link :to="{name: 'blog', params:{id: post.id}}">{{ post.title }}</router-link>
            <!-- <router-link :to="{name: 'blog', params:{id: getSlug(post.title)}}">{{ post.title }}</router-link> -->   <!-- if you slug -->
        </h1>
        <p>
            <router-link :to="{name: 'blog', params:{id: post.id}}">
                <img :src="`https://source.unsplash.com/random/300x200?${post.id}`" alt="">
            </router-link>
            {{ post.body }}
        </p>
    </article>
    
</template>

<style scoped>

</style>