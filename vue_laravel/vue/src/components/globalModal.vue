<script setup>
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

// Modal visibility control
const isModalOpen = ref(false)
const modalTitle = ref('Alert')
const modalMessage = ref('')


// Function to open the modal
function openModal(type) {
  isModalOpen.value = true
  if (type === 'delete') {
    modalTitle.value = 'Delete Confirmation'
    modalMessage.value = 'Are you sure you want to delete this item?'
  } else if (type === 'update') {
    modalTitle.value = 'Update Confirmation'
    modalMessage.value = 'Are you sure you want to update this item?'
  } else if (type === 'alert') {
    modalTitle.value = 'Alert'
    modalMessage.value = 'This is an important alert message.'
  }
}

// Function to close the modal
function closeModal() {
  isModalOpen.value = false
}

// Functions for actions
function handleDelete() {
  console.log('Item deleted')
  closeModal()
}

function handleUpdate() {
  console.log('Item updated')
  closeModal()
}

function handleAlert() {
  console.log('Alert acknowledged')
  closeModal()
}
</script>


<template>
  <div class="space-x-4">
    <!-- Buttons to open modal -->
    <button @click="openModal('delete')" class="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
    <button @click="openModal('update')" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
    <button @click="openModal('alert')" class="px-4 py-2 bg-yellow-600 text-white rounded-lg">Alert</button>
  </div>

  <!-- Modal -->
  <VueFinalModal v-model="isModalOpen"
    content-transition="slide-up-down"
    content-class="flex flex-col max-w-xl mx-4 p-6 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-4">
    <!-- Modal header -->
    <h1 class="text-xl font-semibold">{{ modalTitle }}</h1>
    <!-- Modal message -->
    <p>{{ modalMessage }}</p>

    <!-- Modal footer with buttons -->
    <div class="flex justify-end space-x-4">
      <button v-if="modalTitle === 'Delete Confirmation'" @click="handleDelete"
        class="px-4 py-2 bg-red-600 text-white rounded-lg">Confirm Delete</button>

      <button v-if="modalTitle === 'Update Confirmation'" @click="handleUpdate"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg">Confirm Update</button>

      <button v-if="modalTitle === 'Alert'" @click="handleAlert"
        class="px-4 py-2 bg-yellow-600 text-white rounded-lg">OK</button>

      <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
    </div>
  </VueFinalModal>
</template>

<style scoped>
/* Modal Slide-up and Slide-down Transition */
.slide-up-down-enter-active, .slide-up-down-leave-active {
  transition: all 0.3s ease;
}
.slide-up-down-enter-from, .slide-up-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-down-enter-to, .slide-up-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
