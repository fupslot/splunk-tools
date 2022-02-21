const fs = require("fs");
const path = require("path");
const prettyBytes = require("pretty-bytes");

const { panic } = require("./helpers.js");
const args = require("./args");

const filePath = path.resolve(__dirname, "..", args._[0]);

const data = fs.readFileSync(filePath, { encoding: "utf8" });

let json = null;
try {
  json = JSON.parse(data);
  if (!Array.isArray(json) && args.key) {
    json = json[args.key];
  }

  if (!Array.isArray(json)) {
    panic(
      `File "${filePath}". data['${args.key || ""}'] not iterable."`,
      !args.key ? `Missing --key="<path to array>"` : ""
    );
  }

  console.log("file:", filePath);
  console.log("size:", prettyBytes(data.length));
  console.log("total records:", json.length);
} catch (e) {
  panic(e);
}

module.exports = json;
