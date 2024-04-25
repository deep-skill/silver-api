require("dotenv").config();
const request = require('supertest');
const { ISSUERBASEURL, CLIENT_ID, CLIENT_SECRET, AUDIENCE, TEST_URL } = process.env;

describe('Test server', () => {

    beforeAll( async () => {
        const response = await request(ISSUERBASEURL)
        .post('oauth/token')
        .send({
            "client_id":CLIENT_ID,
            "client_secret":CLIENT_SECRET,
            "audience":AUDIENCE,
            "grant_type":"client_credentials"
        });
        jwt = response.body.access_token;
    });

    test('Debería dar un 200', async () => {
        const response = await request(TEST_URL).get('/silver-api/reserves/').set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
    });

    });