<script setup>
    import { auth } from '../store/auth'
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const isOpen = ref(false);

    function toggleDropdown() {
      isOpen.value = !isOpen.value;
    }

    function handleClickOutside(event) {
      if (!event.target.closest('.relative')) {
        isOpen.value = false;
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });
    

    // function logout() {
    //   axios.get('/user-logout')
    //       .then(response => {
    //           const { status, message } = response.data;

    //           if (status === 'success') {
    //               showToast('success', message); 
    //               setTimeout(() => {
    //                   router.visit('/login'); 
    //               }, 1000); 
    //           }
    //       })
    //       .catch(error => {
    //           if (error.response && error.response.data && error.response.data.errors) {
    //               error.response.data.errors.forEach(err => {
    //                   showToast('error', err);
    //               });
    //           } else {
    //               showToast('error', 'Network problem!!');
    //           }
    //       });
    //   }


</script>

<template>

<header class="z-10 py-4 bg-gray-800 shadow-md">
  <div
    class="container flex items-center justify-between h-full px-6 mx-auto text-purple-300"
  >
    <!-- Search input -->
    <div class="flex justify-center flex-1 lg:mr-32">
      <div class="relative w-full max-w-xl mr-6 focus-within:text-purple-300">
        <div class="absolute inset-y-0 flex items-center pl-2">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          class="w-full pl-8 pr-2 text-sm text-gray-200 placeholder-gray-400 bg-gray-700 border-0 rounded-md focus:shadow-outline-purple focus:placeholder-gray-300 focus:bg-gray-600 focus:border-purple-500 focus:outline-none form-input"
          type="text"
          placeholder="Search for projects"
          aria-label="Search"
        />
      </div>
    </div>


    <ul class="flex items-center flex-shrink-0 space-x-6">
      <!-- Notifications menu -->
      <li class="relative">
        <button
          class="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            ></path>
          </svg>
          <!-- Notification badge -->
          <span
            aria-hidden="true"
            class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"
          ></span>
        </button>
      </li>
      <!-- Profile menu -->
      <li class="relative">
        <button
          class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
          @click="toggleDropdown"
        >
          <img
            class="object-cover w-8 h-8 rounded-full"
            src="https://res.cloudinary.com/di3vqfy5i/image/upload/v1728488977/H_A_S_A_N_izwcor.png"
            alt="Profile Image"
            aria-hidden="true"
          />
        </button>

        <ul
          v-show="isOpen"
          class="absolute right-0 mt-2 w-48 bg-gray-600 border border-gray-600 rounded-md shadow-lg overflow-hidden z-20"
        >
          <li>
            <a href="#" class="block text-white px-4 py-2 text-sm hover:bg-gray-400">
              Profile
            </a>
          </li>
          <li>
            <a href="#" @click="auth.logout()" class="block text-white px-4 py-2 text-sm hover:bg-gray-400">
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</header>


</template>

