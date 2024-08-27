<script setup>
    const props = defineProps([
        'fname', 'lname'
    ]);
    const emit = defineEmits(['update:fname', 'update:lname']);
</script>

<template>
    <label>First Name</label><br/>
    <input type="text" :value="fname" @input="$emit('update:fname', $event.target.value)" style="color: red;"> <br/>

    <label>Last Name</label><br/>
    <input type="text" :value="lname" @input="$emit('update:lname', $event.target.value)" style="color: red;">
</template>

<style scoped>

</style>