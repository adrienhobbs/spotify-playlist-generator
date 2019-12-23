const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true, credentials: true });
const app = express();
const validateFirebaseIdToken = require("./middlewares")
  .validateFirebaseIdToken;

const checkTokenStatus = require("./middlewares").checkTokenStatus;
const databaseSetup = require("./middlewares").databaseSetup;
const Spotify = require("./SpotifyApi");
const ranges = ["short_term", "medium_term", "long_term"];

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

function getTopTracks(time_range) {
  return Spotify.getMyTopTracks({ time_range, limit: 50 }).then(res => {
    return res.body.items.map(pruneTrack);
  });
}

function getTopArtists(time_range = "") {
  return Spotify.getMyTopArtists({ time_range, limit: 50 }).then(res => {
    return res.body.items.map(pruneArtist);
  });
}

function getRecentlyPlayed() {
  return Spotify.getMyRecentlyPlayedTracks({
    limit: 50
  }).then(res => {
    return res.body.items.map(history => ({
      playedAt: history.played_at,
      ...pruneTrack(history.track)
    }));
  });
}

app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);
app.use(databaseSetup);
app.use(checkTokenStatus);

app.get("/top-tracks", async (req, res) => {
  const short_term = await getTopTracks("short_term");
  const medium_term = await getTopTracks("medium_term");
  const long_term = await getTopTracks("long_term");

  res.json({ short_term, medium_term, long_term });
});

app.get("/top-artists", async (req, res) => {
  try {
    const short_term = await getTopArtists("short_term");
    const medium_term = await getTopArtists("medium_term");
    const long_term = await getTopArtists("long_term");
  } catch (err) {
    res.json({ short_term, medium_term, long_term });
  }
});

app.get("/recently-played", async (req, res) => {
  const recentlyPlayed = await getRecentlyPlayed();
  res.json({ recentlyPlayed });
});

app.get("/get-token", (req, res) => {
  res.json({ testing: 123, tokens: req.tokens });
});

app.get("/test-error", (req, res) => {
  res.status(403).json({ error: "Something went wrong." });
});

app.get("/listening-data", async (req, res) => {
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
