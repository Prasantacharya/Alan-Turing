const utils = require("./scrape.js");
const cron = require('node-cron');
const fs = require('fs');

// main function
(() => {
  // config for each channel
  let config = JSON.parse(fs.readFileSync("./config/config.json"));

  // goes through all channels and sends them on their requried hours
  Object.keys(config).forEach((channel) => {

    // calc cron expr
    let cronExpr = "0 " + config[channel]["hours"] + " * * *";

    // scrape and send on whatever hours are required
    cron.schedule(cronExpr, () => {
      utils.scrape_leetcode_and_send(config[channel]["endpoint"]);
    });
  });

})();
