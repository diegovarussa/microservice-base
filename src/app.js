const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const ip = require("ip");
const delay = require('delay');
const basicAuth = require('express-basic-auth')
const basicAuthMid = basicAuth({ users: { 'environment': process.env.BASIC_AUTH_PASS }, challenge: true });

const home = require('./app/Home');
const publicIp = require('./app/PublicIp');
const headers = require('./app/Headers');
// const redis = require('./app/Redis');
// const mySql = require('./app/MySql');
const cpu = require('./app/Cpu');
const memory = require('./app/Memory');
const probes = require('./app/Probes');
// const connection = require('./app/Connection');

// Create endpoint for kubernetes probes: liveness, readiness
const { createLightship } = require('lightship')
const lightship = createLightship({ "detectKubernetes": false, "port": 3000 })

app.get('/', async (req, res) => {
    console.log(req.headers);
    res.json(await home(app, req)).end();
});

app.get('/public-ip', async (req, res2) => {
    res2.json(await publicIp()).end();
});

app.get('/private-ip', async (req, res) => {
    res.json(ip.address()).end();
});

app.get('/env', basicAuthMid, async (req, res) => {
    res.json(sort(process.env)).end();
});

app.get('/headers', async (req, res) => {
    let data = await headers(req);
    res.json(sort(data)).end();
});

app.get('/cpu/:number?', async (req, res) => {
    let { number } = req.params;
    number = parseInt(number);
    res.json(await cpu(number || 1)).end();
});

app.get('/memory/:config?', async (req, res) => {
    let { config } = req.params;
    res.json(memory(config)).end();
});

app.get('/probes/:config?', (req, res) => {
    let { config } = req.params;
    res.json(probes(lightship, config)).end();
});

// app.get('/connections-test', async (req, res) => {
//     res.json(await connection()).end();
// });

// app.get('/redis', async (req, res) => {
//     res.json(await redis()).end();
// });

// app.get('/mysql', async (req, res) => {
//     res.json(await mySql()).end();
// });

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

const server = app.listen(port, () => {
    console.log(`🛡️ Express server listening on port: ${port} 🛡️`);
    lightship.signalReady();
});

lightship.registerShutdownHandler(async () => {
    // Allow sufficient amount of time to allow all of the existing
    // HTTP requests to finish before terminating the service.
    await delay(1000 * 5);

    server.close();
});

function sort(obj) {
    return Object.keys(obj).sort().reduce((a, b) => {
        a[b] = obj[b];
        return a;
    }, {});
    // return [...new Map(Object.entries(obj).sort())];
}

module.exports = app;