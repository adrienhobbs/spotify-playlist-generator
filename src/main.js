import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebaseSetup";
import "./axiosSetup";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      if (user && !this.$store.state.user) {
        unsub();
        const { displayName, email, photoURL, uid } = user;
        this.$store.commit("SET_USER_PROFILE_DATA", {
          displayName,
          email,
          photoURL,
          uid
        });
        this.$store.dispatch("getListeningData").then(() => {
          this.$router.push("/dashboard");
        });
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
