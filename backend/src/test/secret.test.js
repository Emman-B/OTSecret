// Tests the functionality of secret.js

require('dotenv').config();
const secret = require('../secret');
const { mockrequest, mockresponse } = require('./mocks');

test('Creating one secret should have secret stored correctly', async () => {
    // create the expected data
    const expectedMessage = 'a secret message';
    // create fake request and response
    const request = new mockrequest();
    const response = new mockresponse();
    // set the body of the fake request
    request.body = {
        password: 'a secret password',
        message: expectedMessage,
    };

    // create the secret, providing the request and response
    await secret.createNewSecret(request, response);

    // the fake response will have an id
    const id = response.jsonObj.id;

    // set the params of the request
    request.params = {
        id,
    };

    // retrieve the secret message, providing the request and response
    await secret.retrieveSecret(request, response);

    // expect the secret to be correct
    expect(response.jsonObj.message).toBe(expectedMessage);
});

test('Creating two secrets should have both secrets stored correctly', async () => {
    // expected data
    const secretPassword1 = 'secret password 1';
    const expectedMessage1 = 'secret message 1';
    const secretPassword2 = 'secret password 2';
    const expectedMessage2 = 'secret message 2';

    // create fake requests and responses
    const request1 = new mockrequest();
    const response1 = new mockresponse();
    const request2 = new mockrequest();
    const response2 = new mockresponse();
    // set the bodies of the fake requests
    request1.body = {
        password: secretPassword1,
        message: expectedMessage1,
    };
    request2.body = {
        password: secretPassword2,
        message: expectedMessage2,
    };

    // create the secret, providing the requests and responses
    await secret.createNewSecret(request1, response1);
    await secret.createNewSecret(request2, response2);

    // the fake responses will have an id
    const id1 = response1.jsonObj.id;
    const id2 = response2.jsonObj.id;

    // set the params of the requests
    request1.params = {
        id: id1,
    };
    request2.params = {
        id: id2,
    };

    // retrieve the secret message, providing the requests and responses
    await secret.retrieveSecret(request1, response1);
    await secret.retrieveSecret(request2, response2);

    // expect the secrets to be correct
    expect(response1.jsonObj.message).toBe(expectedMessage1);
    expect(response2.jsonObj.message).toBe(expectedMessage2);
});

test('Creating one secret and trying to retrieve it more than once should fail', async () => {
    // create the expected data
    const expectedMessage = 'a secret message';
    // create fake request and response
    const request = new mockrequest();
    const response = new mockresponse();
    // set the body of the fake request
    request.body = {
        password: 'a secret password',
        message: expectedMessage,
    };

    // create the secret, providing the request and response
    await secret.createNewSecret(request, response);

    // the fake response will have an id
    const id = response.jsonObj.id;

    // set the params of the request
    request.params = {
        id,
    };

    // retrieve the secret message twice, keeping track of the second response
    await secret.retrieveSecret(request, response);
    await secret.retrieveSecret(request, response);

    // expect the secret to be correct
    expect(response.statusCode).toBe(404);
});
