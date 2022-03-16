<template>
  <h2>Create user</h2>
  <input v-model="userName">
  <button @click="createUser">Create</button>
  <p>{{ output }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { UserService } from '../services/user.service.ts'

const userName = ref('')
const output = ref('')

function createUser () {
  console.log('Create user')
  UserService.create({ name: userName.value }).then(response => {
    console.log(response.data)
    output.value = response.data.name
  }).catch(e => {
    console.log(e)
  })
}

</script>

<style scoped>

</style>
