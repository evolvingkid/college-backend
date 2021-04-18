const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzMwZjdkZjRjYzM4MTE4MGViYTQzNSIsImlhdCI6MTYxODE1MzM5MH0.Zkgz14qiWFNbgsP5FBqnx8lMlS6Q6bfpsdoPEQ4gQX8';


const request = require('supertest');
const app = require('../api');
const connectDB = require('../config/db');
const expect = require('chai').expect;
const { randomNumber } = require('../config/customFunction');
const mongoose = require('mongoose');

// ? sigin
describe('GET /api/user', () => {

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);

        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });


    it('normal user list data', (done) => {

        request(app).post('/api/user').auth(accessToken).send()
            .expect(200)
            .end((err, res) => {

                console.log(res.body);

                expect(res.body).to.contain.property('data');
                expect(res.status).to.equal(200);
                done();
            });
    });

});


