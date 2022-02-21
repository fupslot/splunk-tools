// Ex: node ./splunk-upload.js --token="" ./data.json
// const args "./lib/args.mjs";
const api = require("./lib/api");
const data = require("./lib/data");
const { panic } = require("./lib/helpers");

async function main() {
  const total = data.length;
  let loaded = 0;

  console.log("start uploading...");

  let next = data.pop();
  while (next) {
    try {
      const [status, data] = await api.pushEvent(next);
      if (status !== 200) {
        panic("status:", status, data.text);
      }
      loaded += 1;
    } catch (_) {
      /* error */
    }
    next = data.pop();
  }

  console.log("total:", total);
  console.log("loaded:", loaded);
}

main().catch(console.error);
