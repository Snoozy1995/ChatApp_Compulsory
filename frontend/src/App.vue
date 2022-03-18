<script setup lang="ts">
import { RouterView } from "vue-router";
import { UserStore } from "@/stores/userStore";
import TabMenu from "primevue/tabmenu";

const userStore = UserStore();
const items = [
  { to: "/", label: "Home", icon: "pi pi-fw pi-home" },
  //{ to: "/chat", label: "Chats", icon: "pi pi-fw pi-book" },
  { to: "/friends", label: "Friends" },
];
</script>

<template>
  <div v-if="userStore.userName.length > 0" style="padding-bottom:20px;">
    <TabMenu :model="items" />
    <span> Logged in as: {{ userStore.userName }} </span>
  </div>
  <RouterView />
</template>
