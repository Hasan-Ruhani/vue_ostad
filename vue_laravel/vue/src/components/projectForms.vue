<script setup>
  import { ref, onMounted } from 'vue'
  import { categories, fetchCategories } from '../store/category'
  import categoryModal from './category_modal.vue'

  onMounted(() => {
    fetchCategories()
  });
  const categoryModalRef = ref(null)
  function openCategoryModal() {
    if(categoryModalRef.value) {
      categoryModalRef.value.openModal()
    }
  }

</script>

<template>

  <main class="h-full pb-16 overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <h2
        class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Create Project
      </h2>


        <div class="px-4 py-3 mb-3 rounded-lg shadow-md dark:bg-gray-800">
          <div class="flex gap-5">
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Client Name*</span>
              <input id="client" 
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="Jane Doe"
              />
            </label>
            
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Project Name*</span>
              <input id="head_line" 
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="Design your life community"
              />
            </label>
          </div>

          <div class="flex gap-5 mt-3">
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">
                Category*
              </span>
              <div class="relative text-gray-500 focus-within:text-purple-600">
                <select
                  
                  class="block appearance-none w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select rounded-l-md rounded-[5px]"
                  style="-webkit-appearance: none; -moz-appearance: none; appearance: none;"
                >
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                
                <div 
                  role="button"
                  tabindex="0"
                  @click="openCategoryModal"
                  @keydown.enter="openCategoryModal"
                  class="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple flex items-center justify-center" 
                  style="cursor: pointer; height: 100%;"
                >
                  +
                </div>


                <!-- Include the modal component -->
                <categoryModal ref="categoryModalRef" />
              </div>
            </label>

            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Duration*</span>
              <input id="duration"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="5 years experianced"
              />
            </label>
          </div>

          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Description*</span>
            <textarea id="description" 
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray rounded-[4px]"
              rows="3"
              placeholder="Enter some long form content."
            ></textarea>
          </label>

          <div class="flex gap-5">
            <label class="block mt-4 text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Problem (optional)</span>
              <textarea id="problem" 
                class="block w-full mt-1 text-xs p-2 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray rounded-[4px]"
                rows="2"
                placeholder="Enter some problem about thsi project"
              ></textarea>
            </label>

            <label class="block mt-4 text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Result (optional)</span>
              <textarea id="result" 
                class="block w-full mt-1 text-xs p-2 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray rounded-[4px]"
                rows="2"
                placeholder="What's the result?"
              ></textarea>
            </label>
          </div>

          <div class="flex gap-5 mt-3">
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Solution (optional)</span>
              <div class="relative">
                <div class="flex flex-wrap items-center gap-2 p-2 bg-transparent border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
                  <!-- Display the current solutions within the input -->
                  <span class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    solution
                    <button class="ml-2 text-green-800 hover:text-green-600">
                      &times;
                    </button>
                  </span>
                  <!-- Input field for new solutions -->
                  <input 
                    class="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-700 dark:text-gray-300 dark:bg-transparent"
                    placeholder="What did you solve?"
                  />
                </div>
              </div>
            </label>

            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Tag (optional)</span>
              <div class="relative">
                <div class="flex flex-wrap items-center gap-2 p-2 bg-transparent border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-purple-400">
                  <!-- Display the current tags within the input -->
                  <span  class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    tag
                    <button  class="ml-2 text-blue-800 hover:text-blue-600">
                      &times;
                    </button>
                  </span>
                  <!-- Input field for new tags -->
                  <input 
                    class="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-700 dark:text-gray-300 dark:bg-transparent"
                    placeholder="Add some tags here"
                  />
                </div>
              </div>
            </label>
          </div>

          <div class="flex gap-5 mt-3">
            <label class="block text-sm w-full mt-3">
              <span class="text-gray-700 dark:text-gray-400">Project URL*</span>
              <input id="project_url" 
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="https://www.project.com"
              />
            </label>

            <label class="block text-sm w-full mt-3" for="file_input">
              <span class="text-gray-700 dark:text-gray-400">Upload image*</span>
              <div class="relative">
                <input id="file_input" type="file" 
                  class="opacity-0 absolute w-full h-full cursor-pointer"
                  aria-describedby="file_input_help"
                />
                <div class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px] cursor-pointer pl-3 py-1.5">
                  Choose File
                </div>
              </div>
            </label>
          </div>

          <!-- Displaying selected images with a remove button for each -->
          <!-- <div class="flex gap-5 mt-1">
            <draggable
              v-model="form.images"
              item-key="url"
              @start="onDragStart"
              @end="onDragEnd"
              class="flex space-x-4"
              :move="onMove"
              :animation="200"
            >
              <template #item="{ element, index }">
                <div
                  :key="index"
                  class="relative w-24 h-24"
                >
                  <img :src="element.url" class="object-cover w-full h-full rounded" alt="Preview">
                  <button 
                    @click="() => removeImage(index)"
                    @keydown.enter="() => removeImage(index)"
                    class="absolute top-1 right-1 bg-gray-500 text-white p-1 rounded-full flex items-center justify-center w-6 h-6 cursor-pointer"
                    aria-label="Remove image"
                  >
                    &times;
                  </button>
                </div>
              </template>
            </draggable>
          </div> -->

        </div>
        <div class="flex justify-between gap-5">
            <button type="submit" class="block w-full px-20 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-500 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Create Project
            </button>

            <RouterLink :to="{ name: 'projects' }" class="block w-full px-20 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-600">
              Cancel
            </RouterLink>
          </div>
    </div>
  </main>

</template>

<style scoped>

</style>