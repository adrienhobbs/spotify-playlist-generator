import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_PROFILE_DATA: (state, user) => {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    }
  },
  actions: {
    login(store, token) {
      return firebase.auth().signInWithCustomToken(token);
    },
    logout({ commit }) {
      commit("LOGOUT");
      firebase
        .auth()
        .signOut()
        .then(() => {
          location.reload();
        });
    }
  }
});
