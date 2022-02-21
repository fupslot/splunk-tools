const axios = require("axios");
const args = require("./args");
const config = require("./config");

console.log("config.splunkBaseUrl", config.splunkBaseUrl);

const api = axios.create({
  baseURL: config.splunkBaseUrl,
  headers: {
    Authorization: `Splunk ${args.token}`,
  },
});

// This tell the axios dol not throw an error if the response status less then 500
api.defaults.validateStatus = (status) => status < 500;

api.pushEvent = async (event) => {
  const res = await api.post("/services/collector", { event: { ...event } });
  return [res.status, res.data];
};

module.exports = api;
