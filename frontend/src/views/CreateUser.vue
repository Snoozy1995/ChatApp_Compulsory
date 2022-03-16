<template>
  <center>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-8">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Create an account to use the chat</div>
      </div>

      <div>
        <label for="name1" class="block text-900 font-medium mb-2">Name</label>
        <InputText id="name1" v-model="inputName" type="text" class="w-full mb-3" />

        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" v-model="inputEmail" type="text" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" v-model="inputPassword" type="password" class="w-full mb-3" />

        <Button label="Sign In" @click="handleCreateUser" icon="pi pi-user" class="w-full"></Button>
      </div>
    </div>
  </center>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const inputName = ref("");
const inputEmail = ref("");
const inputPassword = ref("");

function handleCreateUser() {
  userStore.createUser(inputName.value, inputEmail.value, inputPassword.value);
}
</script>

<style scoped></style>
