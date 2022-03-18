<template>

  <InputText
    id="search1"
    v-model="inputQuery"
    placeholder="Search users"
    type="text"
    class="w-full mb-3"
    v-on:input="searchHandler"
  />
  <div v-if="results.length">
    Results:
    <div class="surface-card p-4 shadow-2 border-round w-full">
      <ul>
        <li v-for="(chat, index) in results" v-bind:key="index">
          <div class="grid">
            <div class="col-10" style="line-height: 40px; height: 40px">
              {{ chat.name }}
            </div>
            <div class="col-2" style="height: 40px">
              <Button
                icon="pi pi-plus"
                @click="addFriend(chat)"
                class="p-button-rounded p-button-success p-button-icon-only p-button-text p-button-sm"
              ></Button>
            </div>
          </div>
          <Divider />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { FriendRequestStore } from "../stores/friendRequestStore";
import { ref } from "vue";
import Divider from "primevue/divider";
import type { User } from "@/models/User";

const inputQuery = ref("");

const userStore = UserStore();
const friendRequestStore = FriendRequestStore();
const results = ref([]);

function searchHandler() {
  if (inputQuery.value == "") {
    results.value = [];
    return;
  }
  userStore.search(inputQuery.value).then((res)=>{
    console.log(res);
    results.value = res;
  });
}

function addFriend(uuid: User){
  friendRequestStore
    .sendFriendRequest(userStore.loggedInUser, uuid)
    .catch((err) => console.log(err));
}
</script>

<style scoped></style>
