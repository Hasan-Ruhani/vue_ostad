<script setup>
  import { authStore } from "./store/store";
  const auth = authStore;
</script>

<template>
    <header class="bg-black border-b-light-100 border-b h-20 text-white items-center flex items-center justify-between p-5 text-2xl">
      A Wonderful Blog
      ({{ auth.user?.name }})   <!--  '?' use for if name property have in user so return value or not have so return null.  -->
      <p>
        <button v-if="auth.isAuthenticated" @click="auth.logout()" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            logout
          </span>
        </button>
      </p>
    </header>
    <section class="flex text-white bg-neutral-900">
      <aside class="w-[450px] bg-black ">
        <!-- <Sidebar/> -->
        <router-view name="LeftSideBar"></router-view>
      </aside>
      <main class="w-full min-h-screen p-5">
        <router-view></router-view>
      </main>
    </section>
    <footer></footer>
</template>

<style scoped>

</style>
