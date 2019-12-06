process.env.NODE_ENV = 'test';
let app = require('../server');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block

describe('/GET ', () => {
    it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                //   res.body.should.be.a('array');
                //   res.body.length.should.be.eql(0);
                done();
            });
    });
});
