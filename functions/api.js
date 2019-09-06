const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true, credentials: true });
const app = express();
const validateFirebaseIdToken = require("./middlewares")
  .validateFirebaseIdToken;

const checkTokenStatus = require("./middlewares").checkTokenStatus;
const databaseSetup = require("./middlewares").databaseSetup;
const Spotify = require("./SpotifyApi");

function pruneArtist(artist) {
  return {
    genres: artist.genre,
    href: artist.href,
    id: artist.id,
    images: artist.images,
    name: artist.name,
    popularity: artist.popularity,
    type: artist.type
  };
}

function pruneTrack(track) {
  return {
    artists: track.artists,
    album: track.album,
    name: track.name,
    id: track.id,
    href: track.href,
    popularity: track.popularity,
    previewUrl: track.preview_url,
    type: track.type
  };
}

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

app.get("/listening-data", async (req, res) => {
  const ranges = ["short_term", "medium_term", "long_term"];

  let listeningData = {
    tracks: {},
    artists: {},
    recentlyPlayed: null
  };

  const tracks = ranges.map(range =>
    Spotify.getMyTopTracks({ time_range: range, limit: 50 }).then(res => {
      listeningData.tracks[range] = res.body.items.map(pruneTrack);
      return res;
    })
  );

  const artists = ranges.map(range =>
    Spotify.getMyTopArtists({ time_range: range, limit: 50 }).then(res => {
      listeningData.artists[range] = res.body.items.map(pruneArtist);
      return res;
    })
  );

  const recentlyPlayed = Spotify.getMyRecentlyPlayedTracks({
    limit: 50
  }).then(res => {
    listeningData.recentlyPlayed = res.body.items.map(history => ({
      playedAt: history.played_at,
      ...pruneTrack(history.track)
    }));
    return res;
  });

  await Promise.all([...tracks, ...artists, recentlyPlayed]);

  res.json(listeningData);
});

module.exports = app;
