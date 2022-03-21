<template>
  <div v-if="!chatStore.room"><select-room></select-room></div>
  <div v-if="chatStore.room">
    <Breadcrumb :home="home" :model="items" />
    <div style="margin-bottom:60px;margin-top:10px;">
      <div v-if="chatStore.somebodyTyping" style="font-size:14px;font-weight:bold;text-align:center;">Somebody is typing...</div>
      <ul style="list-style-type: none; padding: 0px;margin-bottom:0px;">
        <li
          style="font-size: 14px; line-height: 14px"
          v-for="(chat, index) in chatStore.chats"
          v-bind:key="index"
        >
          <Tag
            style="font-size: 10px"
            rounded
            severity="info"
            v-bind:value="new Date(chat.timestamp).toLocaleTimeString('en-US')"
          ></Tag>
          <b>&nbsp;{{ chat.user.name }}</b>: {{ chat.text }}
          <Divider style="margin: 5px"></Divider>
        </li>
      </ul>
    </div>
    <InputText
      id="text1"
      v-model="inputText"
      type="text"
      class="w-full p-inputtext-lg"
      placeholder="Type chat message here and press enter to send..."
      style="position: fixed; bottom: 0px; left: 0px"
      v-on:keyup.enter="onEnter"
      v-on:input="typingHandler"
    />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "primevue/breadcrumb";
import Tag from "primevue/tag";
import { ChatStore } from "@/stores/chatStore";
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";
import SelectRoom from "../components/SelectRoom.vue";

const inputText = ref("");

const chatStore = ChatStore();
const userStore = UserStore();
chatStore.$subscribe((obj,state) => {
  items[0].label = "Room: "+state.room+" (Leave room)";
});

let items = [{ label: "", command: leaveRoom }];
const home = { icon: "pi pi-home", command: leaveRoom };

var typing = false;
var timeout: number | undefined = undefined;

function leaveRoom() {
  chatStore.setRoom("", userStore.loggedInUser);
}

function timeoutFunction() {
  typing = false;
  chatStore.setTyping(false, userStore.loggedInUser);
}

function typingHandler() {
  if (typing == false) {
    typing = true;
    chatStore.setTyping(true, userStore.loggedInUser);
    timeout = setTimeout(timeoutFunction, 1000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 1000);
  }
}

function onEnter() {
  if (!chatStore.room) return;
  if(typing){
    clearTimeout(timeout);
    timeoutFunction();
  }
  chatStore.sendMessage(inputText.value);
  inputText.value = "";

}
</script>

<style scoped></style>
