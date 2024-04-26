require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('User Module', () => {

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
  const route = 'users/';
  const entity = 'User';
  test(`Post ${entity}`, async () => {

    const response = await request(TEST_URL)
      .post(route)
      .set(jwt)
      .send({
        "role": "admin",
        "name": "Pedro",
        "last_name": "Lopez",
        "dni": "76382941",
        "ruc": "47362843951",
        "phone_number": "+51-84-574-861",
        "email": "email1@email.com",
        "address": "Jr. Andahuaylas 1, Lima, Peru",
        "enterprise_id": 1
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
      id: expect.any(Number),
      role: expect.any(String),
      name: expect.any(String),
      lastName: expect.any(String),
      dni: expect.toBeOneOf([expect.any(String), null]),
      ruc: expect.toBeOneOf([expect.any(String), null]),
      email: expect.toBeOneOf([expect.any(String), null]),
      phoneNumber: expect.toBeOneOf([expect.any(String), null]),
      address: expect.toBeOneOf([expect.any(String), null]),
      rating: expect.any(Number),
      doneTrips: expect.any(Number),
      enterpriseId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});