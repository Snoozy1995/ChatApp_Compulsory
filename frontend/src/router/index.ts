import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateUser from "../views/CreateUser.vue";
import ChatView from "../views/ChatView.vue";
import LoginView from "../views/LoginView.vue";
import FriendsView from "../views/FriendsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresLogin: true,
      },
    },
    {
      path: "/chat",
      name: "Chat",
      component: ChatView,
      meta: {
        requiresLogin: true,
      },
    },
    {
      path: "/createUser",
      name: "CreateUser",
      component: CreateUser,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendsView,
      meta: {
        requiresLogin: true,
      },
    },
  ],
});

import { UserStore } from "../stores/userStore";
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (UserStore().userName.length <= 0) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
