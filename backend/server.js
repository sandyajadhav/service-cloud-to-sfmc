'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const app = express();

var count = 0;

app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

app.post('/activity/execute', (req, res) => {
    count += 1;
    console.log('Execute method is called!');
    if (count % 2 == 0) {
        console.log('Execute method: Success');

        return setTimeout(res.status(200).json({branchResult: 'Success'}),10000);
    } else {
        console.log('Execute method: Failure');
        return setTimeout(res.status(200).json({branchResult: 'Failure'}),10000);
    }
});

app.post(/\/activity\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    return res.status(200).json({success: true});
});

app.use(express.static(Path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT || 12345, () => {
	console.log('customsplit backend is now running!');
});

