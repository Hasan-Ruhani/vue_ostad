<script setup>
  import {ref, reactive} from 'vue'
  import TextComponents from './components/TextComponents.vue'
  import NameComponents from './components/NameComponents.vue'
  import NameComponentsX from './components/NameComponentsX.vue'

  const person = reactive({
    name: 'Abul Kalam'
  });

  const name = ref('Karim');
  const fname = ref('Abdur');
  const lname = ref('Rahman');
</script>

<template>

  <div>
    Original Name {{ name }}
  </div>

  <div>
    <label>Name</label>
    <p>
      <input type="text" v-model="name" style="color: red;">
    </p>
  </div>

  <div>
    <label>Components</label><br/>
    <TextComponents label="name" v-model="name"/>
  </div> <br/>

  <div>
    First Name: {{ fname }} <br/>
    Last Name: {{ lname }}
  </div>

  <div>
    <NameComponents v-model:fname="fname" v-model:lname="lname"/>     <!-- if you want pass multiple value in components -->
  </div><br/>

  <div>
    Name: {{ person.name }} <br/>
  </div>

  <div>
    <NameComponentsX v-model="person.name"/>     <!-- first name and last name binding together -->
  </div>

</template>

<style scoped>

</style>
