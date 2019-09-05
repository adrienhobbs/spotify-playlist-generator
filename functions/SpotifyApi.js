const functions = require("firebase-functions");
const SpotifyWebApi = require("spotify-web-api-node");

const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: functions.config().spotify.redirect_uri
});

module.exports = Spotify;
