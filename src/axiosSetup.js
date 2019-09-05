import axios from "axios";
import firebase from "firebase/app";
import Store from "./store";

axios.interceptors.request.use(
  request => {
    // Do something with response data
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          request.headers.common["Authorization"] = `Bearer ${idToken}`;
          request.withCredentials = true;
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

axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // redirect to lgoin?
    Store.dispatch("logout");
    return Promise.reject(error);
  }
);
