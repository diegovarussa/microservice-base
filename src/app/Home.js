"use strict";

module.exports = async (app, req) => {
  let routes = ['v1.0.17'];
  let host = req.hostname;
  let port = (process.env.PORT === undefined) ? '' : `:${process.env.PORT}`
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      routes.push(`http://${host}${port}${r.route.path}`);
    }
  });

  return routes;
};