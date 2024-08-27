<script setup>

    const props = defineProps({data: Object});

</script>

<template>
    <h6>Name: {{ props.data.name }}</h6>
    <h6>Age: {{ props.data.age }}</h6>
    <h6>City: {{ props.data.city }}</h6>
</template>

<style scoped>

</style>