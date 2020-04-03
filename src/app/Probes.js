"use strict";

module.exports = (lightship, config) => {
  if (config) {
      if(config == '1') {
          lightship.signalReady();
      }
      if(config == '2') {
          lightship.signalNotReady();
      }
      if(config == '3') {
          lightship.shutdown();
      }
  }

  let data = [
      '1 = Set server to [Ready] state',
      '2 = Set server to [Not Ready] state',
      '3 = Shutdown server',
      '-- Current Status --',
      `isServerReady? [${lightship.isServerReady()}]`,
      `isServerShuttingDown? [${lightship.isServerShuttingDown()}]`,
  ];

  return data;
};