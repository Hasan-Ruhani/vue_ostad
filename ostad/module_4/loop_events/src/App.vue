<script setup>
  import { ref, reactive } from 'vue';

 //...................Highlight objects.............. 
 const tasks = [
    { id: 1, title: "Complete project proposal", status: "In Progress" },
    { id: 2, title: "Update website content", status: "Complete" },
    { id: 3, title: "Fix bug in user authentication", status: "In Progress" },
    { id: 4, title: "Prepare presentation slides", status: "Complete" },
    { id: 5, title: "Test new feature implementation", status: "Complete" }
  ];
  //...................Highlight objects..............

  //..................loop
  const items = [
    "Karim",
    "Rahim",
    "Barkat",
    "Jabbar",
    "Salam"
  ]
  //..................loop

  // ............................Click Event.....................
  //.......................................using reactive
  const location = reactive({
    name: "Khulna",
    textColorB: "text-gray-600"
  })

  function chosseLocation(newLocation, textColor){
    location.name = newLocation
    location.textColorB = textColor
  }

  //.........................................using ref
  // const location = ref("Khulna")
  // const textColorB = ref("text-gray-600")

  // function chosseLocation(newLocation, textColor){
  //   location.value = newLocation
  //   textColorB.value = textColor
  // }

  // ............................Click Event...................
  
  function getCompleteTask(){
    return tasks.filter(task => "Complete" == task.status)
  }
</script>

<template>
  <section class="mx-auto container flex items-center text-center flex-col space-y-2">

    <!-- ...................Highlight objects.............. -->
    <!-- <div class="p-5 border border-green-600" 
      :class="[task.id === 4 ? 'w-60' : 'w-40']" 
      v-for="(task, id) in getCompleteTask()" 
      :key="task.id">
      {{ task.id }}. {{ task.title }}
    </div> -->
    <!-- ...................Highlight objects.............. -->
    
    <!-- ......................loop....................... -->

    <!-- <div class="p-5 border border-green-600 w-40" :key="index"
      v-for="(item, index) in items">{{ index + 1 }}. {{ item }}</div>       -->    <!-- here index is number of column -->
      <!-- <div class="p-5 border border-green-600 w-40" v-for="(item) in items">{{ item }}</div>  -->

    <!-- <div class="p-5 border-green-600 w-40"> there are almost same!!</div>
    <div class="p-5 border border-green-600 w-40" v-for="n in 5">{{ n }}</div> -->

     <!-- ......................loop....................... -->

     <!-- ............................Click Event..................... -->

     <!-- ........................................................using reactive...................... -->
    <button class="bg-green-600 w-40" @click="chosseLocation('Dhaka', 'text-green-600')">Dhaka</button>
    <button class="bg-red-600 w-40" @click="chosseLocation('Rajshahi', 'text-red-600')">Rajshahi</button>
    <button class="bg-gray-600 w-40" @click="chosseLocation('Khulna', 'text-gray-600')">Khulna</button>
    <p class="text-yellow-600 w-60">Your selected location name is <span :class="location.textColorB">{{ '"' + location.name + '"' }}</span></p>

    <!-- ..............................................................using ref....................... -->
     <!-- <button class="bg-green-600 w-40" @click="chosseLocation('Dhaka', 'text-green-600')">Dhaka</button>
     <button class="bg-red-600 w-40" @click="chosseLocation('Rajshahi', 'text-red-600')">Rajshahi</button>
     <button class="bg-gray-600 w-40" @click="chosseLocation('Khulna', 'text-gray-600')">Khulna</button>
     <p class="text-yellow-600 w-60">Your selective location name is <span :class="textColorB">{{ '"' + location + '"' }}</span></p> -->

     <!-- ............................Click Event..................... -->
  </section>
</template>

<style scoped>

</style>
