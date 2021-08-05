import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import { isPortrait, isMobile, getOffset } from "../utils/device";

Vue.use(VueRouter);

const titlePrefix = "Выигрывай призы! — ";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: titlePrefix + "Главная",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/account/Profile.vue"),
    meta: {
      title: titlePrefix + "Профайл",
    },
  },

  {
    path: "/dixy",
    name: "Dixy",
    component: () => import("../views/Dixy.vue"),
    meta: {
      title: titlePrefix + "Дикси",
      network: 2,
    },
  },
  {
    path: "/megamart",
    name: "Megamart",
    component: () => import("../views/Megamart.vue"),
    meta: {
      title: titlePrefix + "Мегамарт",
      network: 3,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
