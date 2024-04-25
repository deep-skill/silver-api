require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Stop Module', () => {

    beforeAll( async () => {
        const response = await request(ISSUERBASEURL)
        .post('oauth/token')
        .send({
            "client_id":CLIENT_ID,
            "client_secret":CLIENT_SECRET,
            "audience":AUDIENCE,
            "grant_type":"client_credentials"
        });
        jwt = 'Authorization', `Bearer ${response.body.access_token}`;
    });

    test('Post stop', async () => {
        const response = await request(TEST_URL)
        .post('/stops/')
        .set(jwt)
        .send({
            "trip_id": "1",
            "location": "Street name 123",
            "lat": -12.123,
            "lon": -21.321,
        });
    expect(response.statusCode).toBe(201);
    });

    test('Post stop w/out latitude', async () => {
        const response = await request(TEST_URL)
        .post('/stops/')
        .set(jwt)
        .send({
            "trip_id": "1",
            "location": "Street name 123",
            "lon": -21.321,
        });
    expect(response.statusCode).toBe(400);
    });
    
    test('With auth credentials it must return status Code 200', async () => {
        const response = await request(TEST_URL)
        .get('/silver-api/stops/')
        .set(jwt);
    expect(response.statusCode).toBe(200);
    });

    test('Get all stops must be an instance of array', async () => {
        const response = await request(TEST_URL)
        .get('/silver-api/stops/')
        .set(jwt);
    expect(response.body).toBeInstanceOf(Array);
    });

    test('Stop must be an object', async () => {
        const response = await request(TEST_URL)
        .get('/silver-api/stops/')
        .set(jwt);
    expect(response.body[0]).toBeInstanceOf(Object);
    });

    test('Stop must contain correct attributes and type values', async () => {
        const response = await request(TEST_URL)
        .get('/silver-api/stops/')
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