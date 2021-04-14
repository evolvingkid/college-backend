const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzMwZjdkZjRjYzM4MTE4MGViYTQzNSIsImlhdCI6MTYxODE1MzM5MH0.Zkgz14qiWFNbgsP5FBqnx8lMlS6Q6bfpsdoPEQ4gQX8';


const request = require('supertest');
const app = require('../api');
const connectDB = require('../config/db');
const expect = require('chai').expect;
const { randomNumber } = require('../config/customFunction');
const mongoose = require('mongoose');

// ? sigin
describe('POST /api/auth/signin', () => {

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);

        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('normal siginin', (done) => {

        request(app).post('/api/auth/signin').send({ email: "admin@gmail.com", password: "asdasdasd1" })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('data');
                expect(res.body.data).to.contain.property('acesstoken');
                expect(res.status).to.equal(200);
                done();
            });
    });


    it('sigin with wrong email', (done) => {

        request(app).post('/api/auth/signin').send({ email: "fayezrokcs23@gmail.com", password: "I_love_faker2" })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('error');
                expect(res.status).to.equal(400);

                done();
            });
    });



    it('sigin with wrong password', (done) => {

        request(app).post('/api/auth/signin').send({ email: "fayezmohammed23@gmail.com", password: "sdsdsdsdsdsd" })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('error');
                expect(res.status).to.equal(400);

                done();
            });
    });


    it('sigin with wrong data', (done) => {

        request(app).post('/api/auth/signin').send({ email: "dfdfdfd@gmail.com", password: "sfdsfdsfds" })
            .expect(400)
            .end((err, res) => {

                expect(res.body).to.contain.property('error');
                expect(res.status).to.equal(400);

                done();
            });
    });
});



describe('POST /api/auth/signup', () => {


    it('signup without  token', (done) => {


        request(app).post('/api/auth/signup').send({ email: "admin@gmail.com" , password: "asdasdasd1" }).expect(401).end((err, res) =>{

            expect(res.body).to.contain.property('error');
            expect(res.status).to.equal(401);

            done();
        });
    })

});
