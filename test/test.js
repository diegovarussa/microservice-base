const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);
const app = require("../src/app");
const home = require('../src/app/Home');
const publicIp = require('../src/app/PublicIp');
const headers = require('../src/app/Headers');
const cpu = require('../src/app/Cpu');
const memory = require('../src/app/Memory');
const probes = require('../src/app/Probes');

const validIpExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

describe('Testing the Server', () => {
    it('Home', done => {
        chai.request(app).get("/").end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Home no port', done => {
        delete process.env.PORT;
        chai.request(app).get("/").end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Headers', done => {
        chai.request(app).get("/headers").end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            done();
        });
    });

    it('PrivateIp', done => {
        chai.request(app).get("/private-ip").end((err, res) => {
            expect(res.body).to.match(validIpExp)
            done();
        });
    });

    it('PublicIp', done => {
        chai.request(app).get("/public-ip").end((err, res) => {
            expect(res.body).to.match(validIpExp)
            done();
        });
    });

    it('Env', done => {
        chai.request(app).get("/env").auth('environment', process.env.BASIC_AUTH_PASS).end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.be.not.empty;
            done();
        });
    });

    it('CPU no parameters', done => {
        chai.request(app).get("/cpu").end((err, res) => {
            expect(res.body).to.be.equal(1);
            done();
        });
    });

    it('CPU', done => {
        chai.request(app).get("/cpu/4").end((err, res) => {
            expect(res.body).to.be.equal(5);
            done();
        });
    });

    it('Memory clean', done => {
        chai.request(app).get("/memory").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Memory add elements', done => {
        chai.request(app).get("/memory/1").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Probes ready only', done => {
        chai.request(app).get("/probes").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Probes set to ready', done => {
        chai.request(app).get("/probes/1").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Probes set to not ready', done => {
        chai.request(app).get("/probes/2").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Probes shutdown', done => {
        chai.request(app).get("/probes/3").end((err, res) => {
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('Deny robots', done => {
        chai.request(app).get("/robots.txt").end((err, res) => {
            expect(res.type).to.be.eq('text/plain');
            expect(res.text).to.be.eq('User-agent: *\nDisallow: /');
            done();
        });
    });
});