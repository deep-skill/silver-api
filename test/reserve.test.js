require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Reserve Module', () => {

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
  const route = 'reserves/';
  const entity = 'Reserve';
  test(`Post ${entity}`, async () => {
    const response = await request(TEST_URL)
      .post(route)
      .set(jwt)
      .send({
        "trip_type": "POR HORA",
        "service_type": "ENTERPRISE",
        "service_car_type": "TRUCK",
        "start_time": "2024-04-15T15:30:00-05:00",
        "start_address": "Av. Argentina 151, Lima 15079, Peru",
        "start_address_lat": -12.001,
        "start_address_lon": -77.001,
        "end_address": null,
        "end_address_lat": null,
        "end_address_lon": null,
        "price": 150.0,
        "driver_percent": 10,
        "silver_percent": 20,
        "user_id": 4,
        "enterprise_id": 1,
        "car_id": 1,
        "driver_id": 9
      },);
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
      id: expect.any(Number),
      tripType: expect.any(String),
      serviceType: expect.any(String),
      serviceCarType: expect.any(String),
      startTime: expect.any(String),
      startAddress: expect.any(String),
      startAddressLat: expect.any(Number),
      startAddressLon: expect.any(Number),
      endAddress: expect.toBeOneOf([expect.any(String), null]),
      endAddressLat: expect.toBeOneOf([expect.any(Number), null]),
      endAddressLon: expect.toBeOneOf([expect.any(Number), null]),
      price: expect.any(Number),
      suggestedPrice: expect.toBeOneOf([expect.any(Number), null]),
      driverPercent: expect.any(Number),
      silverPercent: expect.any(Number),
      reservePolyline: expect.toBeOneOf([expect.any(Number), null]),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      userId: expect.any(Number),
      enterpriseId: expect.any(Number),
      carId: expect.any(Number),
      driverId: expect.any(Number),
    });
  });
});