<script setup>
  import {ref, onBeforeMount, onMounted, nextTick, onUnmounted, onUpdated} from 'vue';

  const items = ref([
    'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1710028800&semt=ais',
    'https://img.freepik.com/premium-photo/glacier-mountain-landscape-with-flowers-lake-beautiful-sunset-with-full-moon_713888-1322.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-8-best-free-mountain-background-images-4k-wallpapers-image_2670051.jpg',
    'https://img.freepik.com/premium-photo/glacier-mountain-landscape-with-flowers-lake-beautiful-sunset-with-full-moon_713888-1322.jpg',
    'https://img.freepik.com/premium-photo/starry-night-lake_68067-618.jpg'
  ]);

  let carousel = null;

  const newItem = ref('https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');

  function addNewItem(){
    items.value.push(newItem.value);
    carousel.destroy();

    nextTick(function(){         // nexTick use for, when DOM should work after DOM related any others work
      carousel = new Flickity('#carousel', {});
    });
  }

  onMounted(() => {
    carousel = new Flickity('#carousel', {});
  });



  const status = ref([]);
  const apiResponse = ref(null);

  onMounted(() => {
    status.value.push('on mounted');
  });

  //..........................................if you call onBeforeMount it work before all of this function

  onBeforeMount(() => {
    status.value.push('before mount');

    fetch('https://jsonplaceholder.typicode.com/todos/2')    // if you call an api in onBeforeMount then it work when you want
      .then(response => response.json())
      .then(json => {
        apiResponse.value = json;
      });
  });

</script>

<template>
  <section>
    <div class="container">
      <div class="row">

        <div class="">
          <button @click="addNewItem()" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              add carousel
            </span>
          </button>        
        </div>

        <div class="mx-auto items mt-5" id="carousel">
          <div :style="`background-image:url(${item})`" class="item" v-for="item, index in items" :key="item">
            {{ index + 1 }}
          </div>
        </div>

        <div class="mt-10">
          <p>{{ status }}</p>
          <p>{{ apiResponse }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
  .items{
    width: 600px;
    height: 400px;
  }

  .item{
    width: 600px;
    height: 400px;
    background-color: #ccc;
    background-size: cover;
  }


</style>
