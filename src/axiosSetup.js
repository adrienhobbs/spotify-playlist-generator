import axios from "axios";
import firebase from "firebase/app";

axios.interceptors.request.use(
  request => {
    request.withCredentials = true;
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          request.headers.common["Authorization"] = `Bearer ${idToken}`;
          return request;
        });
    } else {
      return request;
    }
  },
  error => {
    // redirect to lgoin?
    return Promise.reject(error);
  }
);
