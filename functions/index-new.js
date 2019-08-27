/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const functions = require("firebase-functions");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const cors = require("cors")({ origin: "http://localhost:8080" });
const express = require("express");

// Firebase Setup
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});

// Spotify OAuth 2 setup
// TODO: Configure the `spotify.client_id` and `spotify.client_secret` Google Cloud environment variables.
const SpotifyWebApi = require("spotify-web-api-node");
const redirectUri = `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/callback`;
const Spotify = new SpotifyWebApi({
  clientId: functions.config().spotify.client_id,
  clientSecret: functions.config().spotify.client_secret,
  redirectUri: functions.config().spotify.redirect_uri
});

// Scopes to request.
const OAUTH_SCOPES = ["user-read-email"];

const app = express();
app.use(cors({ origin: true }));
app.use(cookieParser());

app.get("/token", () => {});

exports.app = functions.https.onRequest(app);

exports.redirect = functions.https.onRequest((req, res) => {
  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
    console.log("Setting verification state:", state);
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
