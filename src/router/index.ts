import { createRouter, createWebHistory } from "vue-router";
import FeateredView from "@/views/FeaturedView.vue";
import TvShowView from "@/views/TvShowView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: () => {
        return { path: "/featured" };
      },
    },
    {
      path: "/featured/:query?",
      name: "featured",
      component: FeateredView,
    },
    {
      path: "/show/:id",
      name: "show",
      component: TvShowView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
