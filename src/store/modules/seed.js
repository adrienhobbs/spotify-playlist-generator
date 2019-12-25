import Api from "@/api";
import Spot from "../../testapi";

const state = {
  tracks: [],
  artists: [],
  genres: [],
  recommendations: []
};

const mutations = {
  ADD_TRACK(state, track) {
    state.tracks = [...state.tracks, track];
  },
  ADD_ARTIST(state, artist) {
    state.artists = [...state.artists, artist];
  },
  REMOVE_TRACK(state, trackToRemove) {
    const indexToRemove = state.tracks.findIndex(
      track => track.id === trackToRemove.id
    );
    state.tracks.splice(indexToRemove, 1);
  },
  REMOVE_ARTIST(state, artistToRemove) {
    const indexToRemove = state.artists.findIndex(
      artist => artist.id === artistToRemove.id
    );
    state.artists.splice(indexToRemove, 1);
  }
};

const getters = {
  numSelected(state) {
    return state.tracks.length + state.artists.length + state.genres.length;
  },
  canSelect(state, getters) {
    return getters.numSelected < 5;
  }
};

const actions = {
  addSeedItem({ commit, getters }, item) {
    const mutationType = item.type === "artist" ? "ADD_ARTIST" : "ADD_TRACK";
    if (getters.canSelect) {
      commit(mutationType, item);
    }
  },
  removeSeedItem({ commit }, item) {
    const mutationType =
      item.type === "artist" ? "REMOVE_ARTIST" : "REMOVE_TRACK";
    commit(mutationType, item);
  },
  async getRecommendations({ commit, state }) {
    const seed_artists = state.artists.map(artist => artist.id);
    const seed_tracks = state.tracks.map(track => track.id);
    const tracks = await Api.getRecommendations({ seed_artists, seed_tracks });
    const trackUris = tracks.map(track => track.uri).join(",");
    await Api.addTracksToPlaylist(trackUris);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
