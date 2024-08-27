<script setup>
  import { Head } from '@inertiajs/vue3';
  import sideBar from '../../components/dashboard/sideBar.vue';
  import headerr from '../../components/dashboard/header.vue';
  import dashboard from '../../components/dashboard/dashboard.vue';

</script>

<template>
    <Head>
        <title>Dashboard</title>
    </Head>

    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <sideBar/>
      <div class="flex flex-col flex-1 w-full">
        <headerr/>
          <div class="bg-gray-800">
            <div class="rounded-l-xl bg-gray-900">

              <dashboard/>

          </div>
        </div>
      </div>
    </div>


</template>

<style scoped>

</style>