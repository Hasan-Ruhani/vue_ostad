<script setup>
    import { usePage } from "@inertiajs/vue3";
    const page = usePage();
    
</script>

<template>
    <AppNavBar/>
    <h1>Page3</h1>
    <h6>Name: {{ page.props.data.name }}</h6>
    <h6>Age: {{ page.props.data.age }}</h6>
    <h6>City: {{ page.props.data.city }}</h6>

    <h6>message: {{ page.props.message }}</h6>
</template>

<style scoped>

</style>