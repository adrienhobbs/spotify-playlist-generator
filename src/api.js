import axios from "axios";
const API_BASE_URL = "https://us-central1-play-gen.cloudfunctions.net/api";
const HOSTING_BASE_URL = "https://play-gen.firebaseapp.com";

const apiGet = (path, params = {}) =>
  axios.get(`${API_BASE_URL}/${path}`, { params }).then(res => res.data);

export default {
  addTracksToPlaylist(tracks) {
    return apiGet(`add-tracks-to-playlist`, {
      tracks,
      playlistId: "0ktqebeQizuRnstoVJzjGL"
    });
  },
  getListeningData() {
    return apiGet(`listening-data`);
  },
  getRecommendations(seed_data) {
    return apiGet(`get-recommendations`, { seed_data });
  },
  getToken(state, code) {
    return axios
      .get(`${HOSTING_BASE_URL}/token`, {
        params: { state, code }
      })
      .then(res => res.data.token);
  },
  getTopTracks() {
    return apiGet("top-tracks");
  },
  getTopArtists() {
    return apiGet("top-artists");
  },
  getRecentlyPlayed() {
    return apiGet("recently-played");
  }
};
