<template>
  <label for="search1" class="block text-900 font-medium mb-2">Search users</label>
  <InputText id="search1" v-model="inputQuery" type="text" class="w-full mb-3" v-on:input="searchHandler" />
  <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
    <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
      <div>
        <div class="font-medium text-3xl text-900">Friends</div>
        <div class="flex align-items-center text-700 flex-wrap">
          <div class="mr-5 flex align-items-center mt-3">
            <i class="pi pi-users mr-2"></i>
            <span>332 friends online</span>
          </div>
          <div class="mr-5 flex align-items-center mt-3">
            <i class="pi pi-globe mr-2"></i>
            <span>9402 friend requests!</span>
          </div>
        </div>
      </div>
      <div class="mt-3 lg:mt-0">
        <Button
          label="Add friend"
          class="p-button-outlined mr-2"
          icon="pi pi-user-plus"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";

const inputQuery=ref("");

const userStore = UserStore();

function searchHandler() {
  userStore.search(inputQuery.value).then((res)=>{
    console.log(res);
  });
}
</script>

<style scoped></style>
