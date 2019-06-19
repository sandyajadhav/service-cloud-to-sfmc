'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

// Helper utility for verifying and decoding the jwt sent from Salesforce Marketing Cloud.
const verifyJwt = require(Path.join(__dirname, 'lib', 'jwt.js'));
// Helper class that handles all the interactions with Salesforce Service Cloud
// and makes sure open connections are reused for subsequent requests.
const ServiceCloud = require(Path.join(__dirname, 'lib', 'sfdc.js'));
const sfdc = new ServiceCloud(Pkg.options.salesforce.serviceCloud);

const app = express();

var count = 0;

// Register middleware that parses the request payload.
app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

// Route that is called for every contact who reaches the custom split activity
app.post('/activity/execute', (req, res) => {
    // verification error -> unauthorized request
    count += 1;
    console.log('Execute method is called!');

    if (count % 2 == 0) {
        console.log('Execute method: Success');

        return res.status(200).json({branchResult: 'Success'});
    } else {
        console.log('Execute method: Failure');
        return res.status(200).json({branchResult: 'Failure'});
    }
});

// Routes for saving, publishing and validating the custom activity. In this case
// nothing is done except decoding the jwt and replying with a success message.
app.post(/\/activity\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    // verification error -> unauthorized request
    return res.status(200).json({success: true});
});

// Serve the custom activity's interface, config, etc.
app.use(express.static(Path.join(__dirname, '..', 'public')));

// Start the server and listen on the port specified by heroku or defaulting to 12345
app.listen(process.env.PORT || 12345, () => {
	console.log('Service Cloud customsplit backend is now running!');
});

