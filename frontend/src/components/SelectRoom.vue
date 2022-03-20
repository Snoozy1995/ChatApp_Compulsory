<template>
  <Dialog header="Create Room" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}"
          :style="{width: '50vw'}">
    <InputText
        id="search1"
        v-model="inputQuery"
        placeholder="Type room name to join and press enter..."
        type="text"
        class="w-full mb-3 p-inputtext-lg"
        v-on:keyup.enter="onEnter"
    />
    <Button label="Cancel" icon="pi pi-times" @click="closeCreateRoomModal" class="p-button-text"/>
    <Button label="Create" icon="pi pi-check" @click="onCreate" autofocus/>
  </Dialog>
  <h4 class="flex flex-wrap  justify-content-center m-1 font-bold md:font-light">Rooms</h4>
  <div class="flex flex-wrap  justify-content-center m-1">
    <Listbox v-model="selectedRoom" :options="rooms" :multiple="false" :filter="true" optionLabel="name"
             listStyle="max-height:250px" style="width:15rem" filterPlaceholder="Search">
    </Listbox>
  </div>

  <div class="flex flex-wrap align-items-center justify-content-center">
    <Button class="m-1" @click="openCreateRoomModal" label="Create Room" icon="pi pi-external-link"/>
    <Button @click="onEnter" label="Join" class="p-button-rounded p-button-success"/>
  </div>

</template>

<script setup lang="ts">
import {UserStore} from "../stores/userStore";
import {onMounted, ref} from "vue";
import {ChatStore} from "@/stores/chatStore";
import {RoomService} from "@/services/room.service";
import {RoomStore} from "@/stores/roomStore";

const inputQuery = ref("");
const roomsService: RoomService = new RoomService();
const userStore = UserStore();
const chatStore = ChatStore();
const roomStore = RoomStore();
const displayResponsive = ref(false);
const selectedRoom = ref();
let rooms = ref([]);

const openCreateRoomModal = () => {
  displayResponsive.value = true;
};
const closeCreateRoomModal = () => {
  displayResponsive.value = false;
};

function onEnter() {
  if (!selectedRoom) return;
  chatStore.setRoom(selectedRoom.value.name, userStore.loggedInUser);
  console.log(selectedRoom.value.name)
}

function onCreate() {
  if (!inputQuery.value) return;
  chatStore.setRoom(inputQuery.value, userStore.loggedInUser);
  roomStore.createRoom(inputQuery.value, userStore.loggedInUser.uuid)
  console.log(inputQuery.value)
}

function getRooms() {
  roomsService.findAll()
      .then((result) => rooms.value = result.data as Room[])
      .catch((error) => console.log("error: " + error))
}

onMounted(() => {
  getRooms();
})

</script>

<style>
</style>
