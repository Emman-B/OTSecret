// Mock Request for testing
class mockrequest {
    constructor() {
        this.body = {};
        this.params = {};
    }
}


// Mock Response for testing
class mockresponse {
    constructor() {
        // fields
        this.statusCode = 200;
        this.jsonObj = {};
        this.sentData = undefined;
    }

    // methods

    status(code) {
        this.statusCode = code;
        return this; // for chaining function calls
    }
    send(dataToSend) {
        this.sentData = dataToSend;
        return this;
    }
    json(jsonToReturn) {
        if (jsonToReturn == null) {
            this.jsonObj = {};
        } else {
            this.jsonObj = jsonToReturn;
        }

        return this;
    }
}

module.exports = {
    mockrequest,
    mockresponse
};
