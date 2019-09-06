import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase/app";
import Storage from "./storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    listeningData: null
  },
  mutations: {
    SET_USER_PROFILE_DATA: (state, user) => {
      state.user = user;
    },
    SET_LISTENING_DATA: (state, listeningData) => {
      state.listeningData = listeningData;
    },
    LOGOUT(state) {
      state.user = null;
    }
  },
  actions: {
    login(store, token) {
      return firebase.auth().signInWithCustomToken(token);
    },
    getListeningData({ commit }, forceUpdate = false) {
      return Storage.getListeningData(forceUpdate).then(data => {
        commit("SET_LISTENING_DATA", {
          tracks: data.tracks,
          artists: data.artists,
          recentlyPlayed: data.recentlyPlayed,
          updatedAt: data.lastUpdated
        });
      });
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
