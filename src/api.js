import axios from "axios";
const API_BASE_URL = "https://us-central1-play-gen.cloudfunctions.net/api";
const HOSTING_BASE_URL = "https://play-gen.firebaseapp.com";

const apiGet = path =>
  axios.get(`${API_BASE_URL}/${path}`).then(res => res.data);

export default {
  getListeningData() {
    return apiGet(`listening-data`);
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
