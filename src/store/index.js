import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import listeningData from "./modules/listeningData";
import seed from "./modules/seed";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    listeningData,
    seed
  }
});
