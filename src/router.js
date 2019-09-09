import Vue from "vue";
import Router from "vue-router";
import UserDashboard from "./views/UserDashboard.vue";
import Login from "./views/Login.vue";
import store from "./store/index";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "UserDashboard",
      component: UserDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/callback",
      name: "Callback",
      component: Login
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(
      record => record.meta.requiresAuth && !store.state.auth.isAuthenticated
    )
  ) {
    router.push("/");
  }
  next();
});

export default router;
