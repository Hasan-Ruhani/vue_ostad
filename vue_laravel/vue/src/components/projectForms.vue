<script setup>
  import axios from 'axios'
  import { ref, onMounted, reactive } from 'vue'
  import draggable from 'vuedraggable'
  import { serverURL } from '../store/server'
  import { categories, fetchCategories } from '../store/category'
  import { showToast } from '../store/Toast'
  import categoryModal from './category_modal.vue'
  import loadingOverlay from './loadingOverlay.vue';

  onMounted(() => {
    fetchCategories()
  });
  const categoryModalRef = ref(null)
  function openCategoryModal() {
    if(categoryModalRef.value) {
      categoryModalRef.value.openModal()
    }
  }

  const form = reactive({
    head_line: "this is head line",
    description: "this is description",
    client: "this is clinent",
    project_url: "https://www.facebook.com/",
    problem: "thsi is problem",
    result: "this is result",
    duration: "1 years",
    images: [],
    tags: ['help', 'blog'],
    solutions: ['critical error', 'response error', 'time']
  })

  const resetForm = () => {
    Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
            form[key] = []; // Reset arrays to empty
        } else {
            form[key] = ''; // Reset strings to empty
        }
    });
    selectedCategoryId.value = null; // Clear selected category
  }

  const newTag = ref('');
  const newSolution = ref('');

  function addTag() {
    const tag = newTag.value.trim()
    if(tag && !form.tags.includes(tag)) {
      form.tags.push(tag)
      newTag.value = ''
    }
  }

  function addSolution() {
    const solution = newSolution.value.trim()
    if(solution && !form.solutions.includes(solution)) {
      form.solutions.push(solution)
      newSolution.value = ''
    }
  }

  // Function to remove a tag from the array
  function removeTag(event, index) {
      event.preventDefault();
      event.stopPropagation();
      if (index >= 0 && index < form.tags.length) {
        form.tags.splice(index, 1);   // Remove the tag at the specified index
      }
    }

  function removeSolution(event, index) {
    event.preventDefault();
    event.stopPropagation();
    if (index >= 0 && index < form.solutions.length) {
      form.solutions.splice(index, 1);
    }
}

function prepareFormData() {
  const formData = new FormData();
  Object.keys(form).forEach(key => {
      if (Array.isArray(form[key])) {
          form[key].forEach((item) => {
              if (key === 'images' && item.file) {
                  formData.append('images[]', item.file);
              } else {
                  formData.append(`${key}[]`, item);
              }
          });
      } else {
          formData.append(key, form[key]);
      }
  });
  return formData;
}


  function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            form.images.push({
                file: file, // The actual file object to be sent to the server
                url: e.target.result // URL used for previews on the client side
            });
        };
        reader.readAsDataURL(file);
    });
    event.target.value = ''; // Clear the file input after files are added
  }


  function removeImage(index) {
    form.images.splice(index, 1);
  }

    const isLoading = ref(false);         // blur overlay wehen creating project
    const selectedCategoryId = ref(null);
    const createProject = async () => {
    if (!selectedCategoryId.value) {
      showToast('error', 'Category not selected');
      return;
    }

    isLoading.value = true
    const formData = prepareFormData();  // Get prepared FormData from the function

    try {
        const response = await axios.post(`${serverURL}/admin/portfolioItem/${selectedCategoryId.value}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })

        if (response.data.status === 'success') {
            showToast('success', response.data.message || 'Portfolio item created successfully');
            resetForm()
        } else {
            showToast('error', response.data.message || 'Failed to create portfolio item');
        }
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400 && data.message) {
                showToast('error', data.message);
            } else if (data.errors) {
                Object.values(data.errors).forEach(err => {
                    showToast('error', err[0]);
                });
            } else {
                showToast('error', 'An unexpected error occurred.');
            }
        } else {
            showToast('error', 'Network problem or server not responding.');
        }
      }
      finally {
        isLoading.value = false
      }
    }




</script>

<template>

  <main class="h-full pb-16 overflow-y-auto">
    <div class="container px-6 mx-auto grid">

       <loadingOverlay :show="isLoading" />       <!--  for loading overlay   -->

      <h2
        class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
      >
        Create Project
      </h2>


        <div class="px-4 py-3 mb-3 rounded-lg shadow-md dark:bg-gray-800">
          <div class="flex gap-5">
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Client Name*</span>
              <input id="client" v-model="form.client"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="Jane Doe"
              />
            </label>
            
            <label class="block text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Project Name*</span>
              <input id="head_line" v-model="form.head_line"
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
                  v-model="selectedCategoryId"
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
              <input id="duration" v-model="form.duration"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="5 years experianced"
              />
            </label>
          </div>

          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Description*</span>
            <textarea id="description" v-model="form.description"
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray rounded-[4px]"
              rows="3"
              placeholder="Enter some long form content."
            ></textarea>
          </label>

          <div class="flex gap-5">
            <label class="block mt-4 text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Problem (optional)</span>
              <textarea id="problem" v-model="form.problem"
                class="block w-full mt-1 text-xs p-2 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray rounded-[4px]"
                rows="2"
                placeholder="Enter some problem about thsi project"
              ></textarea>
            </label>

            <label class="block mt-4 text-sm w-full">
              <span class="text-gray-700 dark:text-gray-400">Result (optional)</span>
              <textarea id="result" v-model="form.result"
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
                  <span v-for="(solution, index) in form.solutions" :key="index" class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    {{ solution }}
                    <button @click.stop="removeSolution($event, index)" class="ml-2 text-green-800 hover:text-green-600">
                      &times;
                    </button>
                  </span>
                  <!-- Input field for new solutions -->
                  <input v-model="newSolution" @keydown.enter.prevent="addSolution"
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
                  <span v-for="(tag, index) in form.tags" :key="index" class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    {{ tag }}
                    <button @click.stop="removeTag($event, index)" class="ml-2 text-blue-800 hover:text-blue-600">
                      &times;
                    </button>
                  </span>
                  <!-- Input field for new tags -->
                  <input v-model="newTag" @keydown.enter.prevent="addTag"
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
              <input id="project_url" v-model="form.project_url"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input rounded-[5px]"
                placeholder="https://www.project.com"
              />
            </label>

            <label class="block text-sm w-full mt-3" for="file_input">
              <span class="text-gray-700 dark:text-gray-400">Upload image*</span>
              <div class="relative">
                <input id="file_input" type="file" multiple @change="handleFileUpload"
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
          <div class="flex gap-5 mt-1">
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
          </div>

        </div>
        <div class="flex justify-between gap-5">
            <button @click="createProject()" type="submit" class="block w-full px-20 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-500 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Create Project
            </button>

            <button @click="resetForm()" class="block w-full px-20 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-md hover:bg-red-600">
              Empty Form
            </button>
          </div>
    </div>
  </main>

</template>

<style scoped>
  
</style>

