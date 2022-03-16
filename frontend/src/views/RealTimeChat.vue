<template>
  <h2>Component using websockets:</h2>
  <h3>Bind to event (Using Socket-io</h3>
  <input v-model="eventNameInput"> <!-- This input is where we dynamically bind to events -->
  <button @click="bindToEvent">Bind to event</button>
  <br/>
  <h3>Send to event</h3>
  <input v-model="outgoingMessage"> <!-- This input is where we send messages -->
  <button @click="sendToEvent">Send message</button>
  <br/>

  <p><b>Messages</b></p>
  <ul v-if="messages.length>0">
    <li v-for="(message, index) in messages.values()" v-bind:key="index">
      {{ message }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { ChatService } from '@/services/chat.service'
import { ChatEntity } from '@/models/Chat.entity'

const chatService: ChatService = inject<ChatService>('ChatService') as ChatService
let currentRoom = ''
const eventNameInput = ref('')
const messages = ref<string[]>([])
const outgoingMessage = ref('')

function bindToEvent () {
  if (eventNameInput.value.trim().length > 0) {
    chatService.socket.on(eventNameInput.value.trim(), (data: ChatEntity) => {
      messages.value.push(data.userId + ': ' + data.text)
    })
  }
  if (currentRoom.trim().length > 0) {
    chatService.socket.off(currentRoom)
    currentRoom = eventNameInput.value.trim()
  }
}

function sendToEvent () {
  console.log('Sending data')
  chatService.socket.emit('createChat', {
    roomId: 'room',
    userId: 42,
    text: outgoingMessage.value
  })
}

</script>

<style scoped>

</style>
