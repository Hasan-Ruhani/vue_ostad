<script setup>

  import sideBar from '../components/sideBar.vue';
  import headerr from '../components/header.vue';
  import projectForms from '../components/projectForms.vue';

</script>

<template>

    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <sideBar/>
      <div class="flex flex-col flex-1 w-full">
        <headerr/>
          <div class="bg-gray-800">
            <div class="rounded-l-xl bg-gray-900">

              <projectForms/>

          </div>
        </div>
      </div>
    </div>


</template>

<style scoped>

</style>