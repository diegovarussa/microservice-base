"use strict";

const axios = require('axios');

module.exports = async () => {
  let ip = '';

  await axios.get('http://ipv4bot.whatismyipaddress.com/', { cache: false })
    .then(response => {
      ip = response.data;
    });

  return ip;
};