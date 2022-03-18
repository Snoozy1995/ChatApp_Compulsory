<template>
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
        <router-link to="/friends/add">
          <Button
            label="Add friend"
            class="p-button-outlined mr-2"
            icon="pi pi-user-plus"
          ></Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";

import { FriendRequestStore } from "../stores/friendRequestStore";
const friendRequestStore = FriendRequestStore();
const userStore = UserStore();
friendRequestStore.getFriends(userStore.loggedInUser).then(val=>{
console.log(val)
})

</script>

<style scoped></style>
