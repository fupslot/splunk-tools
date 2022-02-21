const panic = (...args) => {
  console.log("panic:", ...args);
  process.exit(1);
};

module.exports = { panic };
