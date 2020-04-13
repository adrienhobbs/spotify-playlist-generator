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
  },
  SELECT_ITEM(state, item) {
    item.selected = true;
  },
  DESELECT_ITEM(state, item) {
    item.selected = false;
  }
};

const getters = {
  tracks(state) {
    return {
      short_term: state.tracks.short_term,
      medium_term: state.tracks.medium_term,
      long_term: state.tracks.long_term,
      recent: state.recentlyPlayed
    };
  },
  artists(state) {
    return {
      short_term: state.artists.short_term,
      medium_term: state.artists.medium_term,
      long_term: state.artists.long_term
    };
  }
};

const actions = {
  async toggleItem({ commit, dispatch }, item) {
    const mutationType = item.selected ? "DESELECT_ITEM" : "SELECT_ITEM";
    const seedActionType = item.selected
      ? "seed/removeSeedItem"
      : "seed/addSeedItem";
    commit(mutationType, item);
    dispatch(seedActionType, item, { root: true });
  },
  async getAll({ commit }, forceUpdate = true) {
    const getListeningData =
      forceUpdate || Storage.refreshData
        ? Api.getListeningData
        : Storage.getListeningData;

    const listeningData = await getListeningData();

    Storage.saveListeningData(listeningData);

    commit("SET_ALL", listeningData);
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
