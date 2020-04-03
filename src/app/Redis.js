// "use strict";
// const redis = require('redis');

// module.exports = async (req) => {
//   console.log(`Redis...`);
//   let result = {};
//   if (process.env.REDIS_HOST) {
//     let client = redis.createClient({
//       host: process.env.REDIS_HOST,
//       port: process.env.REDIS_PORT,
//       password: process.env.REDIS_PASS,
//       tls: process.env.REDIS_HOST
//     });

//     client.on('connect', () => {
//       console.log('Redis client connected');
//       client.set("mykey", "myval", redis.print);
//       client.get("mykey", function (err, reply) {
//         // reply is null when the key is missing
//         console.log(reply);
//         result = result;
//       });
//     });
//     client.on('error', function (err) {
//       console.log('Something went wrong ' + err);
//       result = err;
//     });
//   } else {
//     result = `Missing EnvVars for Redis Connection`;
//   }

//   return result;
// };