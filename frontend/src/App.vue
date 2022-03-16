<template>
  <p>HEADER</p>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/createUser">Create User</router-link> |
    <router-link to="/chat">Chat</router-link>
  </div>
  <router-view/>
  <p>FOOTER</p>
</template>

<script setup>

import { provide } from 'vue'
import { ChatService } from '@/services/chat.service'

provide('ChatService', new ChatService())

</script>
