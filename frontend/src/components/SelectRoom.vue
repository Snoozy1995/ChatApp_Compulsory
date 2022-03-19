<template>
  <h5>Responsive</h5>
  <Button label="Show" icon="pi pi-external-link" @click="openResponsive" />
  <Dialog header="Header" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
    <p>Create Room:</p>
    <InputText
        id="search1"
        v-model="inputQuery"
        placeholder="Type room name to join and press enter..."
        type="text"
        class="w-full mb-3 p-inputtext-lg"
        v-on:keyup.enter="onEnter"
    />
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
      <Button label="Create" icon="pi pi-check" @click="onEnter" autofocus />
    </template>
  </Dialog>

  <h5>Advanced with Templating, Filtering and Multiple Selection</h5>
  <Listbox v-model="selectedCountries" :options="getRooms" :multiple="false" :filter="true" optionLabel="name" listStyle="max-height:250px" style="width:15rem" filterPlaceholder="Search">
    <template #option="slotProps">
      <div class="country-item">
        <div>{{slotProps.option.name}}</div>
      </div>
    </template>
  </Listbox>

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
import { RoomService} from "@/services/room.service";

const inputQuery = ref("");
const roomsService: RoomService = new RoomService();
const userStore = UserStore();
const chatStore = ChatStore();
const displayResponsive = ref(false);
const selectedCountries = ref();

const openResponsive = () => {
  displayResponsive.value = true;
};
const closeResponsive = () => {
  displayResponsive.value = false;
};
function onEnter() {
  if (!inputQuery.value) return;
  chatStore.setRoom(inputQuery.value, userStore.loggedInUser);
}
function getRooms() {
  roomsService.findAll();
}

</script>

<style scoped></style>
