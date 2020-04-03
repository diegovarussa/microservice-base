"use strict";
let memorySimulator = [];

module.exports = (config) => {
  if (config) {
    memorySimulator = Array(config * 1000000).fill('content');
  } else {
    memorySimulator = null;
    memorySimulator = [];
  }

  let data = [
    'Set the array size in million (1 = 1.000.000)',
    '-- Current Status --',
    `Array length [${memorySimulator.length}]`,
  ];

  return data;
};