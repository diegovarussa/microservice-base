"use strict";

module.exports = async (req) => {
  let temp = {};
  temp = req.headers;
  temp.forwarded = req.headers['x-forwarded-for'];
  temp.remoteAddress = req.connection.remoteAddress;
  // let sortObject = sort(temp);
  // console.log(req);
  // console.log(req.protocol)     // "https"
  // console.log(req.hostname)     // "swamp.com"
  // console.log(req.path)         // "/alabama"
  // console.log(req.originalUrl)  // "/alabama?filter=very-humid"
  // console.log(req.subomains)    // "['mossy']"
  // console.log(req.headers['x-forwarded-for'])    // "['mossy']"
  // console.log(req.connection)    // "['mossy']"
  // console.log(req.connection.remoteAddress)    // "['mossy']"

  return temp;
};