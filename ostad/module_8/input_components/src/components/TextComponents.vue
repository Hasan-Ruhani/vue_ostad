<script setup>
    const props = defineProps([
        'label', 'modelValue'
    ]);
    const emit = defineEmits(['update:modelValue']);
</script>


<template>
    <label>{{ label }}</label><br/>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" style="color: red;">
</template>

<style scoped>

</style>
