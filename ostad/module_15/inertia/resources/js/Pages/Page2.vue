<script setup>
import { Head } from '@inertiajs/vue3';
    import AppNavBar from '../Component/AppNavBar.vue';
    import Child2 from '../Component/Child2.vue';

    const props = defineProps({data: Object});
</script>

<template>
    <Head>
        <title>Page-2</title>
    </Head>

    <AppNavBar/>
    <h1>This section from Page-2</h1>
    <h3>Name: {{ props.data.name }}</h3>
    <h3>Age: {{ props.data.age }}</h3>
    <h3>City: {{ props.data.city }}</h3>
    <br/>
    <h1>This section from Child-2</h1>
    <Child2 :data="props.data"/> 
</template>

<style scoped>

</style>