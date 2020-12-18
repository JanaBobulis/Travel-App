const app = require ('../src/server/server')
const supertest = require('supertest');
const request = supertest(app); 

describe('Testing post endpoint', () => {
    it('testing /test endpoint', async (done) => {
        return request.get('/all').then(data => {
            expect(data).toBeDefined();
            done();
        })
        .catch(err => {
            console.log(error)
            done();
        })
    });
})

afterAll((done) => {
    if (app) {
        app.close(done);
    }
})
