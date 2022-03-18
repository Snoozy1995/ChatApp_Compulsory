<template>
  <h2>Send chat</h2>
  <input v-model="txtChatInput" placeholder="Enter chat" /> <br />
  <input v-model="txtRoomInput" placeholder="Enter room" /> <br />
  <button @click="sendChat">Send</button>
  <h2>All chats:</h2>
  <input v-model="txtRoomListener" placeholder="Enter room name" /> <br />
  <button @click="listenToRoom">Connect</button>
  <ul>
    <li v-for="(chat, index) in chatStore.chats" v-bind:key="index">
      {{ chat.text }}
    </li>
  </ul>
  <div v-if="chatStore.somebodyTyping">Somebody is typing...</div>
  <InputText
    id="text1"
    v-model="inputText"
    type="text"
    class="w-full"
    placeholder="Type chat message here..."
    style="position: absolute; bottom: 0px; left: 0px"
    v-on:keyup.enter="onEnter"
    v-on:input="typingHandler"
  />
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chatStore";
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const inputText=ref("");

const chatStore = ChatStore();
const userStore = UserStore();
const txtChatInput = ref("");
const txtRoomInput = ref("");
const txtRoomListener = ref("");

var typing = false;
var timeout: number | undefined = undefined;

function timeoutFunction(){
  typing = false;
  chatStore.setTyping(false,userStore.loggedInUser);
}

function typingHandler(){
  if(typing == false) {
    typing = true;
    chatStore.setTyping(true,userStore.loggedInUser);
    timeout = setTimeout(timeoutFunction, 1000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 1000);
  }

}

function onEnter(){
  if(!chatStore.room) return;
  chatStore.sendMessage(inputText.value);
  inputText.value="";
}

function listenToRoom() {
  chatStore.setRoom(txtRoomListener.value,userStore.loggedInUser);
}

function sendChat() {
  chatStore.createChat({ text: txtChatInput.value, room: txtRoomInput.value });
}

chatStore.setRoom("default",userStore.loggedInUser);
</script>

<style scoped></style>
