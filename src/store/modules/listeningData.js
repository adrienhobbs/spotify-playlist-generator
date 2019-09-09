import Storage from "@/storage";

const state = {
  tracks: [],
  artists: [],
  recentlyPlayed: [],
  updatedAt: null
};

const mutations = {
  SET_ALL(state, { tracks, artists, recentlyPlayed, updatedAt }) {
    state.tracks = tracks;
    state.artists = artists;
    state.recentlyPlayed = recentlyPlayed;
    state.updatedAt = updatedAt;
  }
};

const getters = {};

const actions = {
  getAll({ commit }, forceUpdate = false) {
    return Storage.getListeningData(forceUpdate).then(data => {
      commit("SET_ALL", {
        tracks: data.tracks,
        artists: data.artists,
        recentlyPlayed: data.recentlyPlayed,
        updatedAt: data.lastUpdated
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
