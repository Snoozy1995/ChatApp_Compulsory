<template>
  <div class="grid" style="padding-top:50px;">
    <div class="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
      <InputText
        id="search1"
        v-model="inputQuery"
        placeholder="Type room name to join and press enter..."
        type="text"
        class="w-full mb-3 p-inputtext-lg"
        v-on:keyup.enter="onEnter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "../stores/userStore";
import { ref } from "vue";
import { ChatStore } from "@/stores/chatStore";

const inputQuery = ref("");

const userStore = UserStore();
const chatStore = ChatStore();

function onEnter() {
  if (!inputQuery.value) return;
  chatStore.setRoom(inputQuery.value, userStore.loggedInUser);
}
</script>

<style scoped></style>
