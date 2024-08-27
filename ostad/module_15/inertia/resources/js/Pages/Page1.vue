<script setup>
    import { Head } from '@inertiajs/vue3';
    import AppNavBar from '../Component/AppNavBar.vue';
    import Child1 from '../Component/Child1.vue';
    // import Child3 from "../Component/Child3.vue";

    const props = defineProps({data: Object});
</script>

<template>
    <Head>
        <title>Page-1</title>
    </Head>

    <AppNavBar/>
    <Child1 :data="props.data"/> 
    <br/>
    <h3>This section for Child-3</h3>
    <!-- <Child3/> -->
</template>

<style scoped>

</style>