const admin = require("firebase-admin");

const createFirebaseAccount = async function(
  spotifyID,
  displayName,
  photoURL,
  email,
  accessToken,
  refreshToken,
  expiresIn
) {
  const uid = `spotify:${spotifyID}`;

  const databaseTask = admin
    .database()
    .ref(`/spotifyAccessToken/${uid}`)
    .set({
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000
    });

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
};

module.exports = {
  createFirebaseAccount
};
