import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import { isPortrait, isMobile, getOffset } from "../utils/device";

Vue.use(VueRouter);

const titlePrefix = "Максимум твоей улыбки — ";

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
    path: "/faq",
    name: "Faq",
    component: () => import("../views/Faq.vue"),
    meta: {
      title: titlePrefix + "Вопрос-ответ",
    },
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Feedback.vue"),
    meta: {
      title: titlePrefix + "Обратная связь",
    },
  },
  {
    path: "/winners",
    name: "Winners",
    component: () => import("../views/Winners.vue"),
    meta: {
      title: titlePrefix + "Победители",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
