
<script setup>
  import axios from 'axios'
  import { ref, onBeforeMount, computed } from 'vue'
  import { serverURL } from '../store/server'
  import { showToast } from '../store/Toast'
  import DeleteModal from './delete_modal.vue';
  import { fetchProjects } from '../store/projectList';

  const deleteModal = ref(null);

  const openDeleteModal = (id) => {
    if (deleteModal.value && deleteModal.value.openModal) {
      deleteModal.value.openModal(id);
    }
  };

  const projects = ref([])

  const formattedDate = computed(() => {
    if( projects.value.length > 0) {
      const date = new Date(projects.value[0].created_at)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
    return ''
  })


    onBeforeMount(async () => {
    projects.value = await fetchProjects();
    console.log("modal is close")
  });

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

    axios.post(`${serverURL}/portfolio/status/${id}`, { 
      status: newStatus
    }, {
      withCredentials: true 
    })
    .then(res => {
      if (res.status === 200) {
        const project = projects.value.find(p => p.id === id)
        if (project) {
          project.status = newStatus
        }
        showToast('success', `Project now ${newStatus}`)
      } else {
        showToast('error', 'Failed to update status')
      }
    })
    .catch(error => {
      showToast('error', 'Network problem or server issue')
    })
  }

</script>

<!-- bg-gray-80 -->
<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2
        class="my-4 text-2xl font-semibold text-gray-200"
      >
        <!-- Projects -->
        <a href="https://codeforsite.com/" target="_blank" rel="noopener noreferrer" class="text-xm text-green-300 hover:text-green-600 underline font-medium">
          Visit Site->
        </a>

      </h2>
      <div class="my-5">
        <RouterLink :to="{ name: 'createProject' }"
          class="flex items-center justify-between w-[150px] px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Create project
          <span class="ml-2" aria-hidden="true">+</span>
        </RouterLink>
      </div>

    <DeleteModal ref="deleteModal" />
      <!-- New Table -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-400 uppercase border-b bg-gray-800"
              >
                <th class="px-4 py-3">Project Name</th>
                <th class="px-4 py-3">Duration</th>
                <th class="px-4 py-3">Client</th>
                <th class="px-4 py-3">Project Image</th>
                <th class="px-4 py-3">Date</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <!-- <div v-for="product in products" :key="product.id" class="group relative"></div> -->
            <tbody v-for="project in projects" :key="project.id"
              class="bg-gray-800 divide-y divide-gray-700">

              <tr class="text-gray-400 border-b-[0.5px] border-gray-700">
                <td class="px-4 py-3 text-sm">
                  {{ project.head_line }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ project.duration }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ project.client }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center text-sm">
                    <div v-if="project.firstImage" class="relative hidden md:block">
                        <img
                            class="object-cover w-20 h-10 rounded-[10px]"
                            :src="project.firstImage"
                            alt="Project image"
                            loading="lazy"
                        />
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                    {{ formattedDate }}
                </td>
                <td class="px-4 py-3 text-xs">
                  <label class="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      :checked="project.status === 'active'"
                      @change="toggleStatus(project.id, project.status)"
                      class="sr-only peer"
                    >
                    <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td class="flex px-4 py-3 text-sm">
                  <RouterLink :to="{name: 'updateProject', params: {id: project.id}}" class="mr-2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="font-size: 15px; margin: auto;">
                      <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                    </svg>
                  </RouterLink>
                  <!-- <ModalsContainer /> -->
                  <button  @click="openDeleteModal(project.id)"   class="mr-2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="font-size: 15px; margin: auto;">
                      <path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
                    </svg>
                  </button>
                  
                </td>
              </tr>    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
