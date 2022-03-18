<template>
  <div class="grid" style="padding: 50px">
    <div class="col-12 md:col-8 lg:col-8">
      <div class="font-medium text-3xl text-900">Friends</div>
      <Accordion style="margin-top: 25px" :multiple="true">
        <AccordionTab header="Friend requests pending action">
          <ul>
            <li
              v-for="(request, index) in friendRequestStore.pendingReceivedRequests"
              v-bind:key="index"
            >
              <div class="grid">
                <div class="col-9" style="line-height: 40px; height: 40px">
                  {{ request.creator.name }}
                </div>
                <div class="col-3" style="height: 40px">
                  <Button
                    icon="pi pi-minus"
                    @click="removeFriend(request.creator)"
                    class="p-button-rounded p-button-warning p-button-icon-only p-button-text p-button-sm"
                  ></Button>
                  <Button
                    icon="pi pi-plus"
                    @click="addFriend(request.creator)"
                    class="p-button-rounded p-button-success p-button-icon-only p-button-text p-button-sm"
                  ></Button>
                </div>
              </div>
              <Divider />
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab header="Friend requests sent">
          <ul>
            <li
              v-for="(request, index) in friendRequestStore.pendingSentRequests"
              v-bind:key="index"
            >
              <div class="grid">
                <div class="col-10" style="line-height: 40px; height: 40px">
                  {{ request.receiver.name }}
                </div>
                <div class="col-2" style="height: 40px">
                  <Button
                    icon="pi pi-minus"
                    @click="removeFriend(request.receiver)"
                    class="p-button-rounded p-button-warning p-button-icon-only p-button-text p-button-sm"
                  ></Button>
                </div>
              </div>
              <Divider />
            </li>
          </ul>
        </AccordionTab>
        <AccordionTab header="Friends">
          <ul>
            <li
              v-for="(friend, index) in friendRequestStore.friends"
              v-bind:key="index"
            >
              <div class="grid">
                <div class="col-10" style="line-height: 40px; height: 40px">
                  {{ friend.name }}
                </div>
                <div class="col-2" style="height: 40px">
                  <Button
                    icon="pi pi-minus"
                    @click="removeFriend(friend)"
                    class="p-button-rounded p-button-warning p-button-icon-only p-button-text p-button-sm"
                  ></Button>
                </div>
              </div>
              <Divider />
            </li>
          </ul>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="col-12 md:col-4 lg:col-4">
      <FriendsAdd></FriendsAdd>
    </div>
  </div>
</template>

<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { UserStore } from "../stores/userStore";

import { FriendRequestStore } from "../stores/friendRequestStore";
import type { User } from "@/models/User";
import FriendsAdd from "../components/FriendsAdd.vue";
const friendRequestStore = FriendRequestStore();
const userStore = UserStore();

friendRequestStore.update(userStore.loggedInUser.uuid);
friendRequestStore.listenForFriends(userStore.loggedInUser);

function addFriend(user: User) {
  friendRequestStore.sendFriendRequest(userStore.loggedInUser, user);
}
function removeFriend(user: User) {
  friendRequestStore.removeFriend(userStore.loggedInUser, user);
}
</script>

<style scoped></style>
