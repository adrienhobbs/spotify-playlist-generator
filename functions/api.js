const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true, credentials: true });
const app = express();
const validateFirebaseIdToken = require("./middlewares")
  .validateFirebaseIdToken;

const checkTokenStatus = require("./middlewares").checkTokenStatus;
const databaseSetup = require("./middlewares").databaseSetup;
const Spotify = require("./SpotifyApi");

// const retrieveUserTokens = require("./Database").retrieveUserTokens;
// const retrieveUserSpotifyToken = () => {};

app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);
app.use(databaseSetup);
app.use(checkTokenStatus);

app.get("/get-token", (req, res) => {
  res.json({ testing: 123, tokens: req.tokens });
});

app.get("/test-error", (req, res) => {
  res.status(403).json({ error: "Something went wrong." });
});

app.get("/top", async (req, res) => {
  const ranges = ["short_term", "medium_term", "long_term"];

  const trackPromises = ranges.map(range =>
    Spotify.getMyTopTracks({ time_range: range, limit: 50 }).then(res => ({
      [range]: res.body.items
    }))
  );

  const artistPromises = ranges.map(range =>
    Spotify.getMyTopArtists({ time_range: range, limit: 50 }).then(res => ({
      [range]: res.body.items
    }))
  );

  let tracks = await Promise.all(trackPromises);
  let artists = await Promise.all(artistPromises);
  res.json({
    tracks,
    artists
  });
});

module.exports = app;
