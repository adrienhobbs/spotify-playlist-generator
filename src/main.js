import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "./firebaseSetup";
import "./axiosSetup";
import store from "./store/index";
import "normalize.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user && !this.$store.state.auth.isAuthenticated) {
        unsub();
        this.$store.commit("auth/LOGIN_USER", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        });
        this.$store.dispatch("listeningData/getAll").then(() => {
          this.$router.push("/dashboard");
        });
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
