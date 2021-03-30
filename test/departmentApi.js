const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZheWV6bW9oYW1tZWQyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRwQVkyNDFNemxRWGw0aGVZM05HLmllMFk5TU5aclpvYzlPOWU2Uy9hL3RzejJtQU5FbzVzaSIsImlhdCI6MTYxNjI0NTgxMn0.U0T7FFEMPm0Y7NY6eBKlrXUc5tA_QrhKS9SkKqhzydU';

const request = require('supertest');
const app = require('../api');
const connectDB = require('../config/db');
const expect = require('chai').expect;
const { randomNumber, randomString } = require('../config/customFunction');
const mongoose = require('mongoose');



describe('POST /api/department', () => {

    let userData;

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        connectDB()
            .then(() => {
                request(app).get('/api/user').auth(accessToken, { type: 'bearer' }).send().end((err, res) => {
                    userData = res.body.data[0];
                    done();
                });
            })
            .catch((err) => done(err));
    });

    let departmentName;


    it('normal create department', ((done) => {

        departmentName = randomString(6);

        request(app).post('/api/department').auth(accessToken, { type: 'bearer' })
            .send({ name: departmentName, hod: userData._id }).end((err, res) => {

                expect(res.body).to.contain.property('data');
                expect(res.status).to.equal(201);

                done();

            });
    }));


    it('create department with unknown id', ((done) => {

        departmentName = randomString(6);

        request(app).post('/api/department').auth(accessToken, { type: 'bearer' })
            .send({ name: departmentName, hod: '21231232323' }).end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    }));


    it('create department with different type', ((done) => {

        departmentName = randomString(6);

        request(app).post('/api/department').auth(accessToken, { type: 'bearer' })
            .send({ name: 34324, hod: '21231232323' }).end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    }));


});



describe('GET /api/department', () => {

    before((done) => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        connectDB()
            .then(() => {
                done();
            })
            .catch((err) => done(err));
    });


    it('list department', ((done) => {

        request(app).get('/api/department').auth(accessToken, { type: 'bearer' }).send().end((err, res) => {
            expect(res.body).to.contain.property('data');
            expect(res.status).to.equal(200);

            done();
        })

     }));



     it('list department without auth', ((done) => {

        request(app).get('/api/department').send().end((err, res) => {
            expect(res.body).to.contain.property('msg');
            expect(res.status).to.equal(401);

            done();
        })

     }));


});