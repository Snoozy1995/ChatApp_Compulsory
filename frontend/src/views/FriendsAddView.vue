<template>

  <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
    <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
      <label for="search1" class="block text-900 font-medium mb-2">Search users</label>
      <InputText id="search1" v-model="inputQuery" type="text" class="w-full mb-3" v-on:input="searchHandler" />
    </div>
  </div>
  Results:
  <ul>
    <li v-for="(chat, index) in results" v-bind:key="index">
      {{ chat.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";

const inputQuery=ref("");

const userStore = UserStore();
const results = ref();

function searchHandler() {
  userStore.search(inputQuery.value).then((res)=>{
    console.log(res);
    results.value=res;
  });
}
</script>

<style scoped></style>
