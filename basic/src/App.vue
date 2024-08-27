<script setup>

  // import {images} from './data/data'   // method 01
  import images from './data/data'    // method 02

  const img = 'https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png'
  const title = 'The Image is so beautiful'
  const link = 'https://www.publicdomainpictures.net/en/view-image.php?image=316756&picture=background-image'

  const number = 17

  const object = 'bird'

  function date(){
    alert (new Date())
  }
  // const message = "Welcome get ready to master Vue.js 3 with Ostad"
  // function getDate(){
  //   return "10th July, 2023"
  // }
</script>



<template>
  <!-- <h1>{{message}}</h1>
  <h3>{{getDate()}}</h3> -->

  <section class="...">
      <section class="...">
        <h1 class="...">Data Project</h1>
        <div class="...">
          <img :title="title" :src="img" alt="">
          <h2 class="..."> {{ title }} </h2>
          <a target="_blank" :href="link">
            Image Source
          </a>
        </div>
        <h2 class="...">{{ number }} is {{ number % 2 == 0 ? "Even" : "Odd" }}</h2>
      </section>

    <!-- ...................array section...................... -->
      <section class="...">
        <h1 class="...">Array Project</h1>
        <div class="...">
          <img :title=" images[0].head_line " :src=" images[0].image ">
          <h2 class="..."> {{ images[0].head_line }} </h2>
          <a target="_blank" :href="images[0].address">
            Image Source
          </a>
        </div>
      </section>

    <!-- .....................if else...................... -->
      <section class="...">
        <h1 class="...">if else method</h1>
        <div class="...">

          <img v-if="object == 'butterfly'" src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png">
          <img v-else-if="object == 'panda'" src="https://cincinnatizoo.org/wp-content/uploads/2012/04/Red-Panda-Image-for-Endangered-Excursion-scaled.jpg">
          <img v-else src="https://media.istockphoto.com/id/490507056/photo/golden-tailed-sapphire-hummingbird.jpg?s=612x612&w=0&k=20&c=3HAADlGPbM7rtuH5NPX8xoLtZBWDkVVxo0DdoWnyHNE=">

          <h2 class="..." v-if="object == 'butterfly'"> The Butterfly is so beautiful </h2>
          <h2 class="..." v-else-if="object == 'panda'"> The Panda is so beautiful </h2>
          <h2 class="..." v-else> The Bird is so beautiful </h2>

          <a v-if="object == 'butterfly'" target="_blank" href="https://www.publicdomainpictures.net/en/view-image.php?image=316756&picture=background-image">
            Image Source
          </a>

          <a v-else-if="object == 'panda'" target="_blank" href="https://cincinnatizoo.org/animals-archive/red-panda/">
            Image Source
          </a>

          <a v-else target="_blank" href="https://www.istockphoto.com/photos/tropical-bird">
            Image Source
          </a>

        </div>
        <button @click="date">Date</button>
      </section>

    <!-- .....................v-show(same working like if else)...................... -->
      <section class="...">
        <h1 class="...">show method</h1>
        <div class="...">

          <div v-show="object == 'butterfly'">
            <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png">
            <h2 class="..."> The Butterfly is so beautiful </h2>
            <a target="_blank" href="https://www.publicdomainpictures.net/en/view-image.php?image=316756&picture=background-image">
              Image Source
            </a>
          </div>

          <div v-show="object == 'panda'">
            <img src="https://cincinnatizoo.org/wp-content/uploads/2012/04/Red-Panda-Image-for-Endangered-Excursion-scaled.jpg">
            <h2 class="..."> The Panda is so beautiful </h2>
            <a target="_blank" href="https://cincinnatizoo.org/animals-archive/red-panda/">
              Image Source
            </a>
          </div>

          <div v-show="object == 'bird'">
            <img src="https://media.istockphoto.com/id/490507056/photo/golden-tailed-sapphire-hummingbird.jpg?s=612x612&w=0&k=20&c=3HAADlGPbM7rtuH5NPX8xoLtZBWDkVVxo0DdoWnyHNE=">
            <h2 class="..."> The Bird is so beautiful </h2>
            <a target="_blank" href="https://www.istockphoto.com/photos/tropical-bird">
              Image Source
            </a>
          </div>

        </div>
      </section>
  </section>
</template>

<style scoped>

</style>

