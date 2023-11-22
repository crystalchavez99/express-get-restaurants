const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const app = require('./src/app');
const Restaurant = require('./models/index');

describe('restaurant endpoints', () =>{
    test('returns a status code of 200', async()=>{
        const response = await request(app).get("/restaurants")
        expect(response.statusCode).toBe(200)
    })
    test('returns the correct number of restaurants', async()=>{
        const response = await request(app).get("/restaurants")
        expect(response.body.length).toBeGreaterThan(2)
    })
    test('request returns the correct data', async()=>{
        const response = await request(app).get("/restaurants/1")
        expect(response.body.name).toBe("AppleBees")
    })
    test("request returns the restaurants array has been updated with the new value", async()=>{
        const responseData = await request(app).post("/restaurants").send({
            "name": "IN N OUT",
            "location": "California",
            "cuisine": "Fast Food"
        }).set('Accept', 'application/json')
        expect(responseData.body.name).toBe("IN N OUT");
    })
    test("returns the restaurants array has been updated with the new value.", async()=>{
        const responseData = await request(app).put("/restaurants/4").send({
            "name": "In-N-Out",
        }).set('Accept', 'application/json')
        expect(responseData.body.name).toBe("In-N-Out");
    })
    test("checks delete request",async () =>{
        const responseData = await request(app).del("/restaurants/4")
        expect(responseData.statusCode).toBe(200)
    })
})
