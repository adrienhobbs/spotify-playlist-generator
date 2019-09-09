import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import listeningData from "./modules/listeningData";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    listeningData
  }
});
