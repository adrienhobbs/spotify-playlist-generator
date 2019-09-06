import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as firebase from "firebase/app";

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
    getListeningData({ commit }, forceRefresh = false) {
      const lastUpdated = localStorage.getItem("lastUpdated");
      const msInDay = 86400000;
      const msSinceLastUpdate = Date.now() - lastUpdated;
      const msToMinsMultiplier = 0.00001666667;
      const shouldUpdate = msSinceLastUpdate > msInDay;

      console.log(
        Math.round(msSinceLastUpdate * msToMinsMultiplier),
        "mins since last update."
      );

      if (shouldUpdate || !lastUpdated || forceRefresh) {
        // todo extract to API layer
        return axios
          .get(
            "https://us-central1-play-gen.cloudfunctions.net/api/listening-data"
          )
          .then(res => {
            const lastUpdated = Date.now();
            // todo extract to storage layer
            localStorage.setItem("tracks", JSON.stringify(res.data.tracks));
            localStorage.setItem("artists", JSON.stringify(res.data.artists));
            localStorage.setItem(
              "recentlyPlayed",
              JSON.stringify(res.data.recentlyPlayed)
            );
            localStorage.setItem("lastUpdated", lastUpdated);

            commit("SET_LISTENING_DATA", {
              tracks: res.data.tracks,
              artists: res.data.artists,
              recentlyPlayed: res.data.recentlyPlayed,
              updatedAt: lastUpdated
            });
          });
      } else {
        const tracks = JSON.parse(localStorage.getItem("tracks"));
        const artists = JSON.parse(localStorage.getItem("artists"));
        const recentlyPlayed = JSON.parse(
          localStorage.getItem("recentlyPlayed")
        );
        const updatedAt = JSON.parse(localStorage.getItem("lastUpdated"));
        commit("SET_LISTENING_DATA", {
          tracks,
          artists,
          recentlyPlayed,
          updatedAt
        });
      }
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
