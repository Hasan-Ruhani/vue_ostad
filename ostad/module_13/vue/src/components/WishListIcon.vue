<script setup>
    import { wishlist } from '../store/wishlist';
    const props = defineProps(['product']);
</script>

<template>
    <img @click="wishlist.toggleWishList(product)" class="w-8 cursor-center" :src="wishlist.getIcon(product)" alt="">
</template>

<style scoped>

</style>