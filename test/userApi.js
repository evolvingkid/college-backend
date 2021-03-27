const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZheWV6bW9oYW1tZWQyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRwQVkyNDFNemxRWGw0aGVZM05HLmllMFk5TU5aclpvYzlPOWU2Uy9hL3RzejJtQU5FbzVzaSIsImlhdCI6MTYxNjI0NTgxMn0.U0T7FFEMPm0Y7NY6eBKlrXUc5tA_QrhKS9SkKqhzydU';
const { randomNumber } = require('../config/customFunction');


describe('GET /api/user', () => {

    it('normal user list', (done) => {

        request(app).get('/api/user').send().end((err, res) => {

            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('data');
            done();

        })

    });
});