import Storage from "@/storage";
import Api from "@/api";

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
  },
  SET_RECENTLY_PLAYED(state, recentlyPlayed) {
    state.recentlyPlayed = recentlyPlayed;
  }
};

const getters = {
  shortTermTracks(state) {
    return state.tracks.short_term;
  },
  mediumTermTracks(state) {
    return state.tracks.medium_term;
  },
  longTermTracks(state) {
    return state.tracks.long_term;
  },
  shortTermArtists(state) {
    return state.artists.short_term;
  },
  mediumTermArtists(state) {
    return state.artists.medium_term;
  },
  longTermArtists(state) {
    return state.artists.long_term;
  }
};

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
  },
  getRecentlyPlayed({ commit }) {
    return Api.getRecentlyPlayed().then(res => {
      commit("SET_RECENTLY_PLAYED", res.recentlyPlayed);
      Storage.setItem("recentlyPlayed", res.recentlyPlayed);
      return res.recentlyPlayed;
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
