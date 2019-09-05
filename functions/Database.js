const admin = require("firebase-admin");
const db = admin.database();
const refs = {
  tokens: db.ref("spotifyAccessToken")
};
const Database = {
  user: null,
  db,
  initUser(user) {
    this.user = user;
    this.userTokenRef = refs.tokens.child(user.uid);
  },
  setUserAccessToken(accessToken, expiresIn, refreshToken) {
    return this.userTokenRef.set({
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000
    });
  },
  async userTokenExpired() {
    const tokenData = await this.retrieveUserTokens();
    const snap = tokenData.val();

    return {
      expired: Date.now() >= snap.expiresAt,
      ...snap
    };
  },
  retrieveUserTokens() {
    return this.userTokenRef.once("value");
  }
};

module.exports = Database;
