require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Stop Module', () => {

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
    const route = 'stops/';
    const entity = 'Stop';
    test(`Post ${entity}`, async () => {
        const response = await request(TEST_URL)
            .post(route)
            .set(jwt)
            .send({
                "trip_id": "1",
                "location": "Street name 123",
                "lat": -12.123,
                "lon": -21.321,
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
            lat: expect.any(Number),
            lon: expect.any(Number),
            location: expect.any(String),
            tripId: expect.any(Number),
            arrived: expect.any(Boolean),
            id: expect.any(Number),
      });
    });
});

