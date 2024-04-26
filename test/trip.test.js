require("dotenv").config();
const request = require('supertest');
/* const matchers = require('jest-extended');
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
}); */

const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Trip Module', () => {

    const route = 'trips/';
    const entity = 'Trip';

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
                "reserve_id": 21,
                "total_price": 30,
                "on_way_driver": "2024-04-15T17:30-05:00",
                "status": "COMPLETED",
                "arrived_driver": "2024-04-15 20:58:00+00",
                "start_time": "2024-04-15 20:58:00+00",
                "end_time": "2024-04-15 20:58:00+00",
                "trip_polyline": "r|fhAlg~tM"
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
        expect(response.body[20]).toEqual({
            id: expect.any(Number),
            startTime: expect.toBeOneOf([expect.any(String), null]),
            onWayDriver: expect.any(String),
            arrivedDriver: expect.any(String),
            endTime: expect.toBeOneOf([expect.any(String), null]),
            observation: expect.toBeOneOf([expect.any(Array), null]),
            status: expect.any(String),
            reserveId: expect.any(Number),
            suggestedTotalPrice: expect.toBeOneOf([expect.any(Number), null]),
            totalPrice: expect.toBeOneOf([expect.any(Number), null]),
            tripPolyline: expect.toBeOneOf([expect.any(String), null]),
            waitingTimeExtra: expect.toBeOneOf([expect.any(Number), null]),
            driverRating: expect.toBeOneOf([expect.any(Number), null]),
            passengerRating: expect.toBeOneOf([expect.any(Number), null]),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
      });
    });
});

