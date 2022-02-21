const yargs = require("yargs/yargs");

const { hideBin } = require("yargs/helpers");

const { panic } = require("./helpers.js");

const args = yargs(hideBin(process.argv)).argv;
if (!args._[0]) {
  panic("File upload path not found");
}

if (!args.token) {
  panic('Collector token required. Ex: --token=""');
}

module.exports = args;
