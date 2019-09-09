import * as firebase from "firebase/app";

const state = {
  user: null,
  isAuthenticated: false
};

const getters = {};

const actions = {
  login(store, token) {
    return firebase.auth().signInWithCustomToken(token);
  },
  logout({ commit }) {
    commit("LOGOUT_USER");
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.reload();
      });
  }
};

const mutations = {
  LOGIN_USER(state, user) {
    state.user = user;
    state.isAuthenticated = true;
  },
  LOGOUT_USER(state) {
    state.user = null;
    state.isAuthenticated = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
