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

  const saveListeningData = data => {
    if (data.lastUpdated !== lastUpdated) {
      Object.keys(data).forEach(key => {
        setItem(key, data[key]);
      });

      setItem("lastUpdated", Date.now());
    }
    return getListeningDataFromLocalStorage();
  };

  // todo remove reference to api here?? creates an unnecessary dependency...
  const getListeningData = () => {
    log("Retrieving Listening Data from localstorage!");
    return getListeningDataFromLocalStorage();
  };

  return {
    saveListeningData,
    getListeningData,
    refreshData: !lastUpdated || shouldUpdate(lastUpdated),
    lastUpdated,
    setItem,
    getItem
  };
})();
