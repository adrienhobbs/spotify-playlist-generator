import axios from "axios";
const API_BASE_URL = "https://us-central1-play-gen.cloudfunctions.net/api";
const HOSTING_BASE_URL = "https://play-gen.firebaseapp.com";

export default {
  getListeningData() {
    return axios.get(`${API_BASE_URL}/listening-data`);
  },
  getToken(state, code) {
    return axios
      .get(`${HOSTING_BASE_URL}/token`, {
        params: { state, code }
      })
      .then(res => res.data.token);
  }
};
