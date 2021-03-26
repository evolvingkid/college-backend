const request = require('supertest');
let chai = require('chai');
const app = require('../app');
let should = chai.should();


describe('GET /', () => {

    it('root', (done) => {

        request(app).get('/').send()
        .expect(200)
        .end((err, res) => {

            console.log(res.body);

            if (err) {
                console.log(err);
                res.should.have.status(200);
            }            

            done();
        });
    })
});

