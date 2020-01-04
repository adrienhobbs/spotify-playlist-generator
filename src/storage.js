import api from "./api";
const msInDay = 86400000;
const msToMins = ms => Math.round(ms * 0.00001666667);

const log = msg =>
  console.log(`%c  ${msg}  `, "background-color: #43b081; color: white;");

const shouldUpdate = lastUpdated =>
  log(msToMins(Date.now() - lastUpdated) + " mins since last update.") ||
  Date.now() - lastUpdated > msInDay;

const setItem = (prop, item) =>
  localStorage.setItem(prop, JSON.stringify(item));

const getItem = prop => JSON.parse(localStorage.getItem(prop));

export default (function() {
  const lastUpdated = getItem("lastUpdated");
  const listeningDataKeys = [
    "tracks",
    "artists",
    "recentlyPlayed",
    "lastUpdated"
  ];

  const getListeningDataFromLocalStorage = () => {
    return new Promise(resolve => {
      let listeningData = {};
      listeningDataKeys.forEach(key => (listeningData[key] = getItem(key)));
      resolve(listeningData);
    });
  };

  const setListeningDataToLocalStorage = data => {
    Object.keys(data).forEach(key => {
      setItem(key, data[key]);
    });
    return getListeningDataFromLocalStorage();
  };

  // todo remove reference to api here?? creates an unnecessary dependency...
  const getListeningData = forceUpdate => {
    if (forceUpdate || !lastUpdated || shouldUpdate(lastUpdated)) {
      log("Get Listening Data from API!");
      return api.getListeningData().then(res => {
        setItem("lastUpdated", Date.now());
        return setListeningDataToLocalStorage(res);
      });
    } else {
      log("Retrieving Listening Data from localstorage!");
      return getListeningDataFromLocalStorage();
    }
  };

  return {
    getListeningData,
    lastUpdated,
    setItem,
    getItem
  };
})();
