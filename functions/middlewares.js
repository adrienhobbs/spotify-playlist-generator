const admin = require("firebase-admin");
const db = require("./Database");
const Spotify = require("./SpotifyApi");

const validateFirebaseIdToken = async (req, res, next) => {
  console.log("Check if request is authorized with Firebase ID token");
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      'or by passing a "__session" cookie.'
    );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized No Cookie");
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log("ID Token correctly decoded", decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Error while verifying Firebase ID token:", error);
    res.status(403).json({ error, type: "unauthorized" });
    return;
  }
};

const checkTokenStatus = async (req, res, next) => {
  const { uid } = req.user;
  try {
    const tokens = await db.userTokenExpired(uid);
    console.log(tokens);

    if (tokens.expired) {
      Spotify.setRefreshToken(tokens.refreshToken);
      try {
        const data = await Spotify.refreshAccessToken();

        Spotify.setAccessToken(data.body["access_token"]);
        db.setUserAccessToken(
          data.body["access_token"],
          data.body["expires_in"],
          tokens.refreshToken
        );
      } catch (err) {
        res.status(403).json({ error: err });
      }
    } else {
      Spotify.setAccessToken(tokens.accessToken);
    }
  } catch (err) {
    // maybe redirect to login here?
    console.log(err);
  }
  next();
};

const databaseSetup = (req, res, next) => {
  db.initUser(req.user);
  next();
};

module.exports = {
  validateFirebaseIdToken,
  checkTokenStatus,
  databaseSetup
};
