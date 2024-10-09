<script setup>
import { ref, defineExpose, onBeforeMount } from 'vue';
import axios from 'axios';
import { serverURL } from '../store/server';
import { showToast } from '../store/Toast';
import { fetchProjects } from '../store/projectList';

const showModal = ref(false);
const itemId = ref(null);

const openModal = (id) => {
  itemId.value = id;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

async function confirmDelete() {
  try {
    const res = await axios.delete(`${serverURL}/deletePortfolio/${itemId.value}`, {
      withCredentials: true
    });

    if (res.data.status === 'success') {
      showToast('success', res.data.message);
      closeModal();
    //   window.location.reload()
    } else {
      showToast('error', res.data.message || 'Failed to delete item');
    }
  }
  catch (error) {
    if (error.response) {
      if (error.response.status === 409 && error.response.data.message) {
        showToast('error', error.response.data.message);
      } else if (error.response.data.errors) {
        Object.values(error.response.data.errors).forEach(err => {
          showToast('error', err);
        });
      } else {
        showToast('error', 'Session expired');
      }
    } else {
      showToast('error', 'Network problem or server not responding.');
    }
  }
}

defineExpose({
  openModal,
});
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
      <div v-if="showModal" class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
        <div
          class="w-full p-6 bg-gray-800 rounded-lg shadow max-w-md relative"
          role="dialog"
          @click.self="closeModal"
        >
          <!-- Modal header with close button -->
          <button @click="closeModal" class="absolute top-2.5 right-2.5 text-gray-400 hover:text-white bg-transparent rounded-lg p-1.5">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <!-- Modal body with icon -->
          <div class="flex flex-col items-center mt-4 mb-6 text-center">
            <svg class="text-gray-500 w-11 h-11 mb-3.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <p class="text-gray-300">Are you sure you want to delete this item?</p>
          </div>
          <!-- Modal footer -->
          <div class="flex justify-center space-x-4">
            <button @click="closeModal" class="px-4 py-2 text-red-100 bg-gray-600 rounded hover:bg-gray-500">
              No, cancel
            </button>
            <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s, transform 0.2s;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  .modal-enter-to,
  .modal-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  