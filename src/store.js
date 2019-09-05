import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    authToken: state => {
      return state.user ? state.user.idToken : false;
    }
  },
  mutations: {
    SET_USER_DATA: (state, user) => {
      state.user = user;
    },
    SET_USER_ID_TOKEN: (state, token) => {
      state.user.idToken = token;
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
