const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZheWV6bW9oYW1tZWQyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRwQVkyNDFNemxRWGw0aGVZM05HLmllMFk5TU5aclpvYzlPOWU2Uy9hL3RzejJtQU5FbzVzaSIsImlhdCI6MTYxNjI0NTgxMn0.U0T7FFEMPm0Y7NY6eBKlrXUc5tA_QrhKS9SkKqhzydU';


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

        request(app).post('/api/auth/signin').send({ email: "fayezmohammed23@gmail.com", password: "I_love_faker2" })
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

                expect(res.body).to.contain.property('msg');
                expect(res.status).to.equal(401);

                done();
            });
    });



    it('sigin with wrong password', (done) => {

        request(app).post('/api/auth/signin').send({ email: "fayezmohammed23@gmail.com", password: "sdsdsdsdsdsd" })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('msg');
                expect(res.status).to.equal(403);

                done();
            });
    });


    it('sigin with wrong data', (done) => {

        request(app).post('/api/auth/signin').send({ email: "dfdfdfd@gmail.com", password: "sfdsfdsfds" })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('msg');
                expect(res.status).to.equal(401);

                done();
            });
    });
});


// ? signUp

describe('POST /api/auth/signup', () => {

    let signUpID;

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);

        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });

    afterEach((done) => {
        if (signUpID) {
            request(app).delete(`/api/user/${signUpID}`).send().end((err, res) => {

                done();
            });
        }
    });


    it('normal siginUp', (done) => {

        const num = randomNumber(9999999);

        let email = 'murugan' + num + "@gmail.com"

        console.log(email);

        request(app).post('/api/auth/signup').auth(accessToken, { type: 'bearer' })
            .send({ name: "Mohammed fayez", password: "asdasdasd1", email: email, designation: "Tecahers", priviliage: ['department'] })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('data');
                expect(res.status).to.equal(201);
                signUpID = res.body.data._id;
                done();
            });
    });


    it('data loos siginUp', (done) => {

        const num = randomNumber(5);

        let email = 'murugan' + num + "@gmail.com";

        request(app).post('/api/auth/signup').auth(accessToken, { type: 'bearer' })
            .send({ name: "Mohammed fayez", password: "asdasdasd1", email: email })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('error');
                expect(res.status).to.equal(400);
                done();
            });
    });


    it('repeated siginUp', (done) => {

        let email = 'murugan@gmail.com';

        request(app).post('/api/auth/signup').auth(accessToken, { type: 'bearer' })
            .send({ name: "Mohammed fayez", password: "asdasdasd1", email: email, designation: "Tecahers", priviliage: ['department'] })
            .expect(200)
            .end((err, res) => {

                expect(res.body).to.contain.property('msg');
                expect(res.status).to.equal(403);
                done();
            });
    });



});



describe('GET /api/user', () => {

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);

        connectDB()
            .then(() => done())
            .catch((err) => done(err));
    });


    it('normal list of user', (done) => {

        request(app).get('/api/user').auth(accessToken, { type: 'bearer' }).send().end((err, res) => {

            expect(res.body).to.contain.property('data');
            expect(res.status).to.equal(200);
            done();
        });
    });


    it('normal list of user without token', (done) => {

        request(app).get('/api/user').send().end((err, res) => {

            expect(res.body).to.contain.property('msg');
            expect(res.body).to.contain.property('status');
            expect(res.status).to.equal(401);
            done();
        });
    });


});


describe('DELETE /api/user', () => {

    let usrId ;


        before((done) => {
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);

            connectDB()
                .then(() => {

                    const num = randomNumber(9999999);

                    let email = 'murugan' + num + "@gmail.com"

                    console.log(email);

                    request(app).post('/api/auth/signup').auth(accessToken, { type: 'bearer' })
                        .send({ name: "Mohammed fayez", password: "asdasdasd1", email: email, designation: "Tecahers", priviliage: ['department'] })
                        .expect(200).end((err, res) => {

                            usrId = res.body.data._id;
                            done();
                        })
                })
                .catch((err) => done(err));


        });


    it('normal user Delete', (done) => {
        if (usrId) {
            request(app).delete(`/api/user/${usrId}`).auth(accessToken, { type: 'bearer' }).send().end((err, res) => {

                expect(res.body).to.contain.property('msg');
                expect(res.status).to.equal(200);
                done();
            });
        }else{
            done();
        }  
    });

    it(' user Delete wrong userid' , (done) => {
        
            request(app).delete(`/api/user/wweqe231321`).auth(accessToken, { type: 'bearer' }).send().end((err, res) => {

                console.log(res.body);

                expect(res.body).to.contain.property('msg');
                expect(res.body).to.contain.property('status');
                expect(res.status).to.equal(406);
                done();
            });
         
    });


});