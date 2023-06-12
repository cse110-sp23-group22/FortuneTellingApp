const { join } = require("path");
module.exports = {
  launch: {
    headless: false,
    slowMo: 25,
  },
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
