<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6" style="margin:auto;">
    <div class="text-center mb-5">
      <div class="text-900 text-3xl font-medium mb-3">Authorize to continue using the chat</div>
      <span class="text-600 font-medium line-height-3">Don't have an account?</span>
      <router-link to="/createUser" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</router-link>
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText id="email1" v-model="inputEmail" type="text" class="w-full mb-3" />

      <label for="password1" class="block text-900 font-medium mb-2">Password</label>
      <InputText id="password1" v-model="inputPassword" type="password" class="w-full mb-3" v-on:keyup.enter="handleLoginUser" />

      <Button label="Sign In" @click="handleLoginUser" icon="pi pi-user" class="w-full"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";
import router from "@/router";

const userStore = UserStore();
const inputEmail = ref("");
const inputPassword = ref("");

function handleLoginUser() {
  userStore.loginUser(inputEmail.value, inputPassword.value).then((res) => {
    router.push("/");
  });
}

</script>

<style scoped></style>
