"use strict";

const functions = require("firebase-functions");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const cors = require("cors")({
  origin: true
});

const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});

const SpotifyWebApi = require("spotify-web-api-node");
const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: functions.config().spotify.redirect_uri
});

const OAUTH_SCOPES = [
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "playlist-modify-public",
  "playlist-modify-private"
];

exports.redirect = functions.https.onRequest((req, res) => {
  cookieParser()(req, res, () => {
    const state =
      req.cookies.__session || crypto.randomBytes(20).toString("hex");
    res.cookie("__session", state.toString(), {
      maxAge: 3600000,
      secure: true,
      httpOnly: true
    });
    const authorizeURL = Spotify.createAuthorizeURL(
      OAUTH_SCOPES,
      state.toString()
    );
    res.redirect(authorizeURL);
  });
});

exports.token = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    res.set("Access-Control-Allow-Credentials", "true");
    cookieParser()(req, res, async () => {
      const session = req.cookies.__session;
      if (!session) res.status("500").json({ error: "No session variable" });
      if (session !== req.query.state)
        res.status("500").json({ error: "sessions variables do not match." });

      try {
        const data = await Spotify.authorizationCodeGrant(req.query.code);
        Spotify.setAccessToken(data.body["access_token"]);
        const userResults = await Spotify.getMe();

        const firebaseToken = await createFirebaseAccount(
          userResults.body["id"],
          userResults.body["display_name"],
          userResults.body["images"][0]
            ? userResults.body["images"][0].url
            : false,
          userResults.body["email"],
          data.body["access_token"]
        );
        res.json({ token: firebaseToken });
      } catch (error) {
        // retry with refresh code?
        res.json({ error });
      }
    });
  });
});

async function createFirebaseAccount(
  spotifyID,
  displayName,
  photoURL,
  email,
  accessToken
) {
  const uid = `spotify:${spotifyID}`;

  const databaseTask = admin
    .database()
    .ref(`/spotifyAccessToken/${uid}`)
    .set(accessToken);

  let user = {
    displayName,
    email,
    emailVerified: true
  };

  if (photoURL) {
    user.photoURL = photoURL;
  }

  const userCreationTask = admin
    .auth()
    .updateUser(uid, user)
    .catch(error => {
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: uid,
          ...user
        });
      }
      throw error;
    });

  await Promise.all([userCreationTask, databaseTask]);
  const token = await admin.auth().createCustomToken(uid);
  return token;
}
