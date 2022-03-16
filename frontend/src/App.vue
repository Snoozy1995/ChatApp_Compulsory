<script setup lang="ts">
import { RouterView } from "vue-router";
import { UserStore } from "@/stores/userStore";

const userStore = UserStore();
const items = [
  { to: "/", label: "Home", icon: "pi pi-fw pi-home" },
  { to: "/login", label: "Login", icon: "pi pi-fw pi-user" },
  { to: "/chat", label: "Chats", icon: "pi pi-fw pi-book" },
];
</script>

<template>
  <Menubar :model="items" style="margin-bottom:50px">
    <template #end>
      <span v-if="userStore.userName.length > 0">
        Logged in as: {{ userStore.userName }}
      </span>
    </template>
  </Menubar>
  <RouterView />
</template>
