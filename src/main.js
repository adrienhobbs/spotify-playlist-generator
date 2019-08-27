import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBzvqKweePfkwqSk6NyBntUeqQGsvcAkUM",
  authDomain: "play-gen.firebaseapp.com",
  databaseURL: "https://play-gen.firebaseio.com",
  projectId: "play-gen",
  storageBucket: "",
  messagingSenderId: "941862340381",
  appId: "1:941862340381:web:1cfc68832339786d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user && !this.$store.state.user) {
        const { displayName, email, photoURL } = user;
        this.$store.commit("SET_USER_DATA", { displayName, email, photoURL });
        this.$router.push("/dashboard");
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
