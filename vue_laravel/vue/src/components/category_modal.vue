<script setup>

//commit from vue_laravel
    import { ref, defineExpose } from 'vue';
    import axios from 'axios';
    import { showToast } from '../../utils/Toast';
    import { fetchCategories } from '../../store/category';

    // Modal state
    const isModalOpen = ref(false);
    function openModal() {
    isModalOpen.value = true;
    }

    function closeModal() {
    isModalOpen.value = false;
    }

    // Expose modal methods
    defineExpose({
    openModal,
    closeModal,
    });

    const categoryInput = ref('');
    async function submitCategory() {
    if (categoryInput.value.trim() === '') {
        showToast('error', 'Please provide a category name');
        return;
    }

    try {
        const response = await axios.post('/createCategory', {
            category: categoryInput.value,
        });
        const { status, message } = response.data;

        if (status === 'success') {
            showToast('success', message); 
            categoryInput.value = ''; 
            fetchCategories();      
            closeModal();           
        } else {
            // Additional error information from the server could be handled here
            showToast('error', message || 'Failed to create category');
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            // Handle validation errors (409 Bad Request)
            if (status === 409 && data.message) {
                showToast('error', data.message);
            }
            // Handle other types of errors
            else if (data.errors) {
                Object.values(data.errors).forEach(err => {
                    showToast('error', err);
                });
            } else {
                showToast('error', 'An unexpected error occurred.');
            }
        } else {
            showToast('error', 'Network problem or server not responding.');
        }
      }
    }

</script>


<template>
  <transition
    name="modal"
    enter-active-class="transition ease-out duration-150"
    enter-from-class="opacity-0 transform translate-y-1/2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-1/2"
  >
    <div v-if="isModalOpen" class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
      <div
        class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        role="dialog"
        id="modal"
        @click.self="closeModal"
      >
        <!-- Modal header -->
        <header class="flex justify-end">
          <div
            role="button"
            tabindex="0"
            aria-label="close"
            @click="closeModal"
            @keydown.enter="closeModal"
            class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
            style="outline: none;"
          >
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>

        </header>

        <!-- Modal body -->
        <div class="mt-4 mb-6">
          <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Create Category
          </p>
          <input 
            type="text" 
            v-model="categoryInput"
            placeholder="Enter category name"
            class="w-full text-sm text-gray-700 dark:text-gray-400 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
        </div>

        <!-- Modal footer -->
        <footer
          class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
        >
        <div
          role="button"
          tabindex="0"
          @click="closeModal"
          @keydown.enter="closeModal"
          class="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray cursor-pointer flex items-center justify-center"
          style="cursor: pointer;"
        >
          Cancel
        </div>

        <div
          role="button"
          tabindex="0"
          @click="submitCategory"
          @keydown.enter="submitCategory"
          class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple cursor-pointer"
          style="cursor: pointer; display: inline-block;"
        >
          Create
        </div>

        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
