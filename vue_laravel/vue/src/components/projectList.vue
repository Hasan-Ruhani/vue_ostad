<script setup>


</script>

<!-- bg-gray-80 -->
<template>



  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2
        class="my-4 text-2xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Projects
        
      </h2>
      
      <div class="my-5">
        <Link href="/create-project"
          class="flex items-center justify-between w-[150px]  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Create project
          <span class="ml-2" aria-hidden="true">+</span>
        </Link>
      </div>

      <!-- New Table -->
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
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
            <tbody  
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

              <tr class="text-gray-700 dark:text-gray-400 border-b-[0.5px] border-gray-700">

                <td class="px-4 py-3 text-sm">
                  head_line
                </td>
                
                <td class="px-4 py-3 text-sm">
                  duration
                </td>

                <td class="px-4 py-3 text-sm">
                  client
                </td>

                <td class="px-4 py-3">
                  <div class="flex items-center text-sm">
                  <div class="relative hidden md:block">
                      <img
                          class="object-cover w-20 h-10 rounded-[10px]"
                          src="#"
                          alt="Project image"
                          loading="lazy"
                      />
                  </div>
              </div>


                </td>

                <td class="px-4 py-3 text-sm">
                    Date
                </td>

                <td class="px-4 py-3 text-xs">
                  <label class="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      
                      class="sr-only peer"
                    >
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td>

                <td class="px-4 py-3 text-sm">
                  
                  <button class="mr-2">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="font-size: 15px; margin: auto;">
                      <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                    </svg>
                  </button>
                  
                  <button class="mr-2">
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