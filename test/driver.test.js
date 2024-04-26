require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Driver Module', () => {

    const route = 'drivers/';
    const entity = 'Driver';

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
                "car_id": 6,
                "driver_account_id": 8,
                "name": "Roque Nicolas",
                "last_name": "Molina",
                "dni": "74747747",
                "ruc": "73628394854",
                "license_number": "Q8473628",
                "phone_number": "+51-84-574-868",
                "email": "roquemolinaph@outlook.com",
                "address": "Catamarca 1271, Cordoba, Argentina",
                "image_url": "https://images.ctfassets.net/5d4nhw7jpebm/fDwF5blK4wFIHFmR42AFS/c27469c47d499fc92674575aad3a1826/Roque_Molina.png"
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
            carId: expect.toBeOneOf([expect.any(Number), null]),
            name: expect.any(String),
            lastName: expect.any(String),
            dni: expect.any(String),
            ruc: expect.any(String),
            licenseNumber: expect.any(String),
            phoneNumber: expect.any(String),
            email: expect.any(String),
            address: expect.toBeOneOf([expect.any(String), null]),
            imageUrl: expect.toBeOneOf([expect.any(String), null]),
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            Car: expect.any(Object),
            DriverAccount: expect.any(Object),
            doneTrips: expect.any(Number),
            driverAccountId: expect.any(Number),
            rating: expect.any(Number),
      });
    });
});

