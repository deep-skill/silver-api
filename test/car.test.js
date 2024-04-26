require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Car Module', () => {

    const route = 'cars/';
    const entity = 'Car';

    beforeAll(async () => {
        const auth = await request(ISSUERBASEURL)
        .post('oauth/token')
        .send({
            "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "audience": AUDIENCE,
                "grant_type": "client_credentials"
            });
        jwt = { 'Authorization': `Bearer ${auth.body.access_token}` };
        response = await request(TEST_URL)
        .get(route)
        .set(jwt);
    });
    test(`Post ${entity}`, async () => {
        const response = await request(TEST_URL)
            .post(route)
            .set(jwt)
            .send({
                "license_plate": "ABC-100",
                "owner": "SELF",
                "brand": "Ford",
                "model": "Focus",
                "type": "SEDAN",
                "color": "Blanco",
                "year": 2021
            });
        expect(response.statusCode).toBe(201);
    });

    test(`Get ${entity} with credentials it must return status Code 200`, async () => {
        expect(response.statusCode).toBe(200);
    });

    test(`Get all ${entity} must be an instance of array`, async () => {
        expect(response.body).toBeInstanceOf(Array);
    });

    test(`Get ${entity} must be an instance of Object`, async () => {
        const response = await request(TEST_URL)
            .get(route)
            .set(jwt);
        expect(response.body[0]).toBeInstanceOf(Object);
    });

    test(`${entity} must contain correct attributes and type values`, async () => {
        const response = await request(TEST_URL)
        .get(route)
        .set(jwt);
        expect(response.body[0]).toEqual({
            licensePlate: expect.any(String),
            owner: expect.any(String),
            brand: expect.any(String),
            model: expect.any(String),
            type: expect.any(String),
            color: expect.any(String),
            year: expect.any(Number),
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
      });
    });
});

